import logging
from your_code.integrations import mailchimp_client
from your_code.background_jobs import retry  # Assuming you have a retry decorator

logger = logging.getLogger(__name__)

@retry(max_retries=3, delay=5)  # Retry 3 times with 5 second delay
def update_mailchimp_email_task(consignor_id, new_email, old_email):
    try:
        mailchimp_client.update_subscriber(old_email, new_email)
        logger.info(f"Successfully updated email for consignor {consignor_id} in Mailchimp.")
    except Exception as e:
        logger.error(f"Error updating email for consignor {consignor_id} in Mailchimp: {e}")
        raise  # Re-raise exception for retry mechanism
