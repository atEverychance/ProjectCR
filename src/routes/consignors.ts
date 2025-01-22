import { Hono } from 'hono';
import { z } from 'zod';
import type { Bindings } from '../types';

const router = new Hono<{ Bindings: Bindings }>();

// Schema for consignor profile
const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  preferredContactMethod: z.enum(['email', 'phone']).optional(),
});

// Schema for consignment agreement
const agreementSchema = z.object({
  termsAccepted: z.boolean(),
  commissionRate: z.number().min(0).max(100),
  paymentMethod: z.enum(['direct_deposit', 'check']),
  bankDetails: z.object({
    accountNumber: z.string().optional(),
    routingNumber: z.string().optional(),
  }).optional(),
});

// Get consignor profile
router.get('/profile', async (c) => {
  try {
    const userId = c.req.header('X-User-ID');
    if (!userId) {
      return c.json({ error: 'User ID required' }, 401);
    }

    const profile = await c.env.DB.prepare(
      'SELECT * FROM consignors WHERE user_id = ?'
    ).bind(userId).first();

    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    return c.json(profile);
  } catch (error) {
    console.error('Profile fetch error:', error);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

// Update consignor profile
router.put('/profile', async (c) => {
  try {
    const userId = c.req.header('X-User-ID');
    if (!userId) {
      return c.json({ error: 'User ID required' }, 401);
    }

    const body = await c.req.json();
    const result = profileSchema.safeParse(body);
    
    if (!result.success) {
      return c.json({ error: result.error.errors }, 400);
    }

    const { name, email, phone, address, preferredContactMethod } = result.data;

    await c.env.DB.prepare(`
      UPDATE consignors 
      SET name = ?, email = ?, phone = ?, address = ?, preferred_contact = ?
      WHERE user_id = ?
    `).bind(name, email, phone, address, preferredContactMethod, userId).run();

    return c.json({ 
      status: 'success',
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

// Accept consignment agreement
router.post('/agreement', async (c) => {
  try {
    const userId = c.req.header('X-User-ID');
    if (!userId) {
      return c.json({ error: 'User ID required' }, 401);
    }

    const body = await c.req.json();
    const result = agreementSchema.safeParse(body);
    
    if (!result.success) {
      return c.json({ error: result.error.errors }, 400);
    }

    const { termsAccepted, commissionRate, paymentMethod, bankDetails } = result.data;

    if (!termsAccepted) {
      return c.json({ error: 'Terms must be accepted' }, 400);
    }

    await c.env.DB.prepare(`
      INSERT INTO consignor_agreements (
        user_id, 
        commission_rate, 
        payment_method, 
        bank_account, 
        routing_number,
        accepted_at
      ) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      userId,
      commissionRate,
      paymentMethod,
      bankDetails?.accountNumber,
      bankDetails?.routingNumber
    ).run();

    // Queue welcome email
    await c.env.JOBS_QUEUE.send({
      type: 'email',
      payload: {
        template: 'welcome_consignor',
        userId,
        email: body.email
      }
    });

    return c.json({ 
      status: 'success',
      message: 'Agreement accepted successfully'
    });
  } catch (error) {
    console.error('Agreement error:', error);
    return c.json({ error: 'Failed to process agreement' }, 500);
  }
});

// Get earnings summary
router.get('/earnings', async (c) => {
  try {
    const userId = c.req.header('X-User-ID');
    if (!userId) {
      return c.json({ error: 'User ID required' }, 401);
    }

    const earnings = await c.env.DB.prepare(`
      SELECT 
        SUM(amount) as total_earnings,
        COUNT(DISTINCT sale_id) as total_sales,
        MAX(created_at) as last_sale_date
      FROM consignor_earnings 
      WHERE user_id = ?
    `).bind(userId).first();

    return c.json(earnings);
  } catch (error) {
    console.error('Earnings fetch error:', error);
    return c.json({ error: 'Failed to fetch earnings' }, 500);
  }
});

export { router };