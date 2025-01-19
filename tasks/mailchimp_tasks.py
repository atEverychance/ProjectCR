from your_code.integrations import mailchimp_client  # Assuming you have a Mailchimp client

def update_mailchimp_email_task(consignor_id, new_email, old_email):
    try:
        mailchimp_client.update_subscriber(old_email, new_email)
        print(f"Background job: Successfully updated email for consignor {consignor_id} in Mailchimp.")
    except Exception as e:
        print(f"Background job: Error updating email for consignor {consignor_id} in Mailchimp: {e}")
        # Implement retry logic here or rely on your background job system's retry mechanism
