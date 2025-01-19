import logging
from sqlalchemy.exc import SQLAlchemyError
from your_code.tasks.mailchimp_tasks import update_mailchimp_email_task
from your_code.background_jobs import dispatch_task
from your_code.models import Consignor
from your_code import db

logger = logging.getLogger(__name__)

def update_consignor_profile(consignor_id, new_email):
    try:
        consignor = Consignor.query.get(consignor_id)
        if not consignor:
            logger.error(f"Consignor {consignor_id} not found")
            raise ValueError(f"Consignor {consignor_id} not found")
            
        original_email = consignor.email
        consignor.email = new_email
        db.session.commit()

        # Only dispatch task after successful commit
        dispatch_task(update_mailchimp_email_task, consignor_id, new_email, original_email)
        
        return consignor
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Database error updating consignor {consignor_id}: {e}")
        raise
