import { Hono } from 'hono';
import { z } from 'zod';
import type { Bindings } from '../types';

const router = new Hono<{ Bindings: Bindings }>();

// Schema for event creation/update
const eventSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  location: z.string(),
  maxConsignors: z.number().int().positive(),
  dropOffStart: z.string().datetime(),
  dropOffEnd: z.string().datetime(),
  pickUpStart: z.string().datetime(),
  pickUpEnd: z.string().datetime(),
  status: z.enum(['draft', 'published', 'cancelled', 'completed']),
});

// Schema for time slot
const timeSlotSchema = z.object({
  eventId: z.number(),
  slotTime: z.string().datetime(),
  slotType: z.enum(['drop_off', 'pick_up']),
  maxAppointments: z.number().int().positive(),
});

// List all events
router.get('/', async (c) => {
  try {
    const status = c.req.query('status');
    let query = 'SELECT * FROM events';
    
    if (status) {
      query += ' WHERE status = ?';
      const events = await c.env.DB.prepare(query).bind(status).all();
      return c.json(events.results);
    }

    const events = await c.env.DB.prepare(query).all();
    return c.json(events.results);
  } catch (error) {
    console.error('Events fetch error:', error);
    return c.json({ error: 'Failed to fetch events' }, 500);
  }
});

// Create new event
router.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const result = eventSchema.safeParse(body);
    
    if (!result.success) {
      return c.json({ error: result.error.errors }, 400);
    }

    const event = result.data;
    const { success } = await validateEventDates(event);
    if (!success) {
      return c.json({ error: 'Invalid event dates' }, 400);
    }

    const result2 = await c.env.DB.prepare(`
      INSERT INTO events (
        name, description, start_date, end_date, location,
        max_consignors, drop_off_start, drop_off_end,
        pick_up_start, pick_up_end, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING id
    `).bind(
      event.name,
      event.description,
      event.startDate,
      event.endDate,
      event.location,
      event.maxConsignors,
      event.dropOffStart,
      event.dropOffEnd,
      event.pickUpStart,
      event.pickUpEnd,
      event.status
    ).run();

    const eventId = (result2.results?.[0] as { id: number })?.id;
    if (!eventId) {
      throw new Error('Failed to get inserted event ID');
    }

    // Generate time slots
    await generateTimeSlots(c.env.DB, eventId, event);

    return c.json({ 
      status: 'success',
      message: 'Event created successfully',
      eventId
    });
  } catch (error) {
    console.error('Event creation error:', error);
    return c.json({ error: 'Failed to create event' }, 500);
  }
});

// Get event details
router.get('/:id', async (c) => {
  try {
    const eventId = c.req.param('id');
    const event = await c.env.DB.prepare(
      'SELECT * FROM events WHERE id = ?'
    ).bind(eventId).first();

    if (!event) {
      return c.json({ error: 'Event not found' }, 404);
    }

    // Get time slots
    const slots = await c.env.DB.prepare(
      'SELECT * FROM time_slots WHERE event_id = ?'
    ).bind(eventId).all();

    return c.json({
      ...event,
      timeSlots: slots.results
    });
  } catch (error) {
    console.error('Event fetch error:', error);
    return c.json({ error: 'Failed to fetch event' }, 500);
  }
});

// Update event
router.put('/:id', async (c) => {
  try {
    const eventId = c.req.param('id');
    const body = await c.req.json();
    const result = eventSchema.safeParse(body);
    
    if (!result.success) {
      return c.json({ error: result.error.errors }, 400);
    }

    const event = result.data;
    const { success } = await validateEventDates(event);
    if (!success) {
      return c.json({ error: 'Invalid event dates' }, 400);
    }

    await c.env.DB.prepare(`
      UPDATE events SET
        name = ?, description = ?, start_date = ?, end_date = ?,
        location = ?, max_consignors = ?, drop_off_start = ?,
        drop_off_end = ?, pick_up_start = ?, pick_up_end = ?,
        status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      event.name,
      event.description,
      event.startDate,
      event.endDate,
      event.location,
      event.maxConsignors,
      event.dropOffStart,
      event.dropOffEnd,
      event.pickUpStart,
      event.pickUpEnd,
      event.status,
      eventId
    ).run();

    return c.json({ 
      status: 'success',
      message: 'Event updated successfully'
    });
  } catch (error) {
    console.error('Event update error:', error);
    return c.json({ error: 'Failed to update event' }, 500);
  }
});

// Cancel event
router.post('/:id/cancel', async (c) => {
  try {
    const eventId = c.req.param('id');
    const event = await c.env.DB.prepare(
      'SELECT * FROM events WHERE id = ?'
    ).bind(eventId).first();

    if (!event) {
      return c.json({ error: 'Event not found' }, 404);
    }

    if (event.status === 'cancelled') {
      return c.json({ error: 'Event already cancelled' }, 400);
    }

    await c.env.DB.prepare(`
      UPDATE events SET 
        status = 'cancelled',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(eventId).run();

    // Queue cancellation notifications
    await c.env.JOBS_QUEUE.send({
      type: 'email',
      payload: {
        template: 'event_cancelled',
        eventId,
        eventName: event.name
      }
    });

    return c.json({ 
      status: 'success',
      message: 'Event cancelled successfully'
    });
  } catch (error) {
    console.error('Event cancellation error:', error);
    return c.json({ error: 'Failed to cancel event' }, 500);
  }
});

// Helper functions
async function validateEventDates(event: z.infer<typeof eventSchema>) {
  const now = new Date();
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const dropOffStart = new Date(event.dropOffStart);
  const dropOffEnd = new Date(event.dropOffEnd);
  const pickUpStart = new Date(event.pickUpStart);
  const pickUpEnd = new Date(event.pickUpEnd);

  if (start <= now) {
    return { success: false, error: 'Start date must be in the future' };
  }

  if (end <= start) {
    return { success: false, error: 'End date must be after start date' };
  }

  if (dropOffEnd <= dropOffStart || dropOffStart >= start) {
    return { success: false, error: 'Invalid drop-off dates' };
  }

  if (pickUpStart <= end || pickUpEnd <= pickUpStart) {
    return { success: false, error: 'Invalid pick-up dates' };
  }

  return { success: true };
}

async function generateTimeSlots(db: D1Database, eventId: number, event: z.infer<typeof eventSchema>) {
  // Generate drop-off slots
  const dropOffSlots = generateSlots(
    new Date(event.dropOffStart),
    new Date(event.dropOffEnd),
    30, // 30-minute slots
    5 // 5 appointments per slot
  );

  // Generate pick-up slots
  const pickUpSlots = generateSlots(
    new Date(event.pickUpStart),
    new Date(event.pickUpEnd),
    30,
    5
  );

  // Insert all slots
  const stmt = db.prepare(`
    INSERT INTO time_slots (
      event_id, slot_time, slot_type, max_appointments
    ) VALUES (?, ?, ?, ?)
  `);

  for (const slot of dropOffSlots) {
    await stmt.bind(eventId, slot.toISOString(), 'drop_off', 5).run();
  }

  for (const slot of pickUpSlots) {
    await stmt.bind(eventId, slot.toISOString(), 'pick_up', 5).run();
  }
}

function generateSlots(start: Date, end: Date, intervalMinutes: number, maxAppointments: number): Date[] {
  const slots: Date[] = [];
  let current = new Date(start);

  while (current < end) {
    slots.push(new Date(current));
    current = new Date(current.getTime() + intervalMinutes * 60000);
  }

  return slots;
}

export { router };