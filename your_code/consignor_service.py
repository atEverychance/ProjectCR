from your_code.tasks.mailchimp_tasks import update_mailchimp_email_task  # Import your background task
# Assuming you have a function to dispatch background tasks, e.g., dispatch_task
from your_code.background_jobs import dispatch_task
from your_code.models import Consignor  # Assuming Consignor model is in your_code/models.py
from your_code import db  # Assuming db instance is initialized in your_code/__init__.py

# ... other imports ...

def update_consignor_profile(consignor_id, new_email):
    # ... existing code ...
    consignor = Consignor.query.get(consignor_id)
    original_email = consignor.email
    consignor.email = new_email
    db.session.commit()

    # Dispatch background task to update Mailchimp
    dispatch_task(update_mailchimp_email_task, consignor_id, new_email, original_email)

    return consignor
