import logging
from flask import Blueprint, send_file, request
from your_code.services.cheque_printer import ChequePrinter
from your_code.utils.auth import require_permission
from your_code.utils.validation import validate_uuid

logger = logging.getLogger(__name__)
bp = Blueprint('cheques', __name__)

@bp.route('/api/v1/admin/reports/cheques/<event_id>')
@require_permission('ADMIN_REPORTS_CHEQUE')
def generate_cheques(event_id):
    """Generate PDF of consignor cheques for an event.
    
    Args:
        event_id: UUID of target event
        
    Query Parameters:
        page: Page number (default: 1)
        
    Returns:
        PDF file response
    """
    try:
        # Validate event ID
        if not validate_uuid(event_id):
            return {"error": "Invalid event ID"}, 400
            
        # Get page parameter
        page = request.args.get('page', 1, type=int)
        if page < 1:
            return {"error": "Invalid page number"}, 400
            
        # Generate PDF
        printer = ChequePrinter()
        pdf_data = printer.generate_cheques_pdf(event_id, page)
        
        # Return PDF file
        return send_file(
            pdf_data,
            mimetype='application/pdf',
            as_attachment=True,
            attachment_filename=f'cheques-{event_id}-{page}.pdf'
        )
        
    except Exception as e:
        logger.error(f"Error generating cheques: {e}")
        return {"error": "Failed to generate cheques"}, 500
