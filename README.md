# useSend Testing Suite

This is a comprehensive testing suite for your self-hosted useSend instance.

## About

A comprehensive testing suite for verifying your self-hosted useSend instance is properly configured and working.

## Features

- ✓ REST API transactional email testing
- ✓ SMTP server testing (optional)
- ✓ Configuration validation
- ✓ Detailed logging and error reporting
- ✓ Color-coded output for easy reading
- ✓ Email delivery status tracking

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Edit the `.env` file with your settings:

```env
# useSend Configuration
USESEND_API_KEY=your_api_key_here
USESEND_BASE_URL=https://your-usesend-instance.com

# Email Configuration
SENDER_EMAIL=hello@your-verified-domain.com
RECIPIENT_EMAIL=your-email@gmail.com

# SMTP Configuration (optional)
SMTP_HOST=your-usesend-instance.com
SMTP_PORT=465
SMTP_USERNAME=usesend
SMTP_PASSWORD=your_api_key_here
```

### 3. Run the Tests
```bash
npm test
```

## What Gets Tested

### 1. Configuration Check
Validates that all required environment variables are set:
- API key
- Base URL
- Sender and recipient emails
- SMTP credentials (if testing SMTP)

### 2. REST API Test
- Sends a transactional email via the useSend REST API
- Endpoint: `POST /api/v1/emails`
- Validates API key authentication
- Sends HTML and plain text email
- Returns email ID on success
- Checks delivery status

### 3. SMTP Test (Optional)
- Verifies SMTP connection
- Sends an email via SMTP protocol
- Tests SMTP authentication
- Note: SMTP may not be available on all self-hosted instances

## Expected Output

When tests pass, you'll receive **1-2 test emails** at the configured recipient address:
1. REST API test email with blue header
2. SMTP test email with green header (if SMTP is enabled)

Both emails include timestamps for verification.

## Understanding AWS SES Sandbox Mode

**Important:** If your AWS SES account is in sandbox mode:

### Sandbox Limitations:
- You can only send emails to **verified email addresses**
- You can only send from **verified domains/emails**
- Maximum 200 emails per 24 hours
- Maximum 1 email per second

### Verification Required:

**Sender (Domain):** Already verified in your useSend dashboard
- `no-reply.stratpoint.io` ✅

**Recipient:** Must be verified in AWS SES Console
- Go to AWS SES Console (US-WEST-2 region)
- Navigate to "Verified identities"
- Click "Create identity" → Email address
- Enter recipient email and verify via confirmation link

### Moving to Production:

To send emails to any address without verification:
1. Open AWS SES Console
2. Go to "Account dashboard"
3. Click "Request production access"
4. Fill out the form with your use case
5. Approval typically takes 24-48 hours

## Troubleshooting

### Email Status: FAILED

**Error:** `Email address is not verified`
- **Solution:** Verify the recipient email in AWS SES Console (see Sandbox Mode section)

**Error:** `Domain [...] is wrong. Use the domain verified by useSend`
- **Solution:** Check your sender email uses a verified domain in the useSend dashboard
- Verify domains at: `https://your-instance/dashboard/domains`

**Error:** `Invalid API token`
- **Solution:** Check your API key is correct in the `.env` file
- Generate a new key in useSend dashboard if needed

### REST API Test Failed

**Error:** `404 Not Found`
- **Solution:** Ensure you're using the correct endpoint: `/api/v1/emails` (plural)

**Error:** `Connection timeout`
- **Solution:** Check your instance URL is correct and accessible
- Verify network connectivity: `curl https://your-instance.com`

### SMTP Test Failed

**Error:** `Connection timeout` on port 465/587
- **Solution:** SMTP may not be exposed on your self-hosted instance
- This is normal - REST API is the primary method
- You can skip SMTP testing

**Error:** `Invalid API token` via SMTP
- **Solution:** SMTP configuration may differ from REST API
- Check useSend documentation for SMTP setup

## API Examples

### Send Email via REST API

```bash
curl -X POST "https://your-instance.com/api/v1/emails" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "hello@your-domain.com",
    "to": "recipient@example.com",
    "subject": "Test Email",
    "html": "<h1>Hello!</h1><p>This is a test.</p>",
    "text": "Hello! This is a test."
  }'
```

### Check Email Status

```bash
curl "https://your-instance.com/api/v1/emails/EMAIL_ID" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### List Recent Emails

```bash
curl "https://your-instance.com/api/v1/emails?limit=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Configuration Details

All configuration is in the `.env` file:

| Variable | Description | Example |
|----------|-------------|---------|
| `USESEND_API_KEY` | Your API key from useSend dashboard | `us_abc123...` |
| `USESEND_BASE_URL` | Your useSend instance URL | `https://usesend.example.com` |
| `SENDER_EMAIL` | Verified sender email address | `noreply@yourdomain.com` |
| `RECIPIENT_EMAIL` | Where to send test emails | `you@gmail.com` |
| `SMTP_HOST` | SMTP server hostname | `usesend.example.com` |
| `SMTP_PORT` | SMTP port (465 or 587) | `465` |
| `SMTP_USERNAME` | SMTP username | `usesend` |
| `SMTP_PASSWORD` | SMTP password (usually API key) | `us_abc123...` |

## Project Structure

```
usesend-test/
├── .env                 # Environment variables (not in git)
├── package.json         # Node.js dependencies
├── test-usesend.js      # Main test script
└── README.md           # This file
```

## Test Script Features

The test script (`test-usesend.js`) includes:
- Color-coded console output
- Detailed error messages
- Email delivery tracking
- Status verification
- JSON response parsing
- Configuration validation
- Comprehensive test summary

## Next Steps

After successful testing:

1. **Integrate into your application:**
   - Use the REST API examples above
   - Install a useSend SDK if available
   - Follow useSend documentation for your language

2. **Monitor email delivery:**
   - Check the useSend dashboard for analytics
   - Set up webhooks for delivery notifications
   - Review bounce and complaint rates

3. **Move to production:**
   - Request AWS SES production access (if in sandbox)
   - Set up proper domain authentication (SPF, DKIM, DMARC)
   - Configure email templates
   - Set up monitoring and alerts

## Resources

- **useSend Documentation:** https://docs.usesend.com
- **useSend GitHub:** https://github.com/usesend/useSend
- **AWS SES Documentation:** https://docs.aws.amazon.com/ses/

## Support

For issues with:
- **This test script:** Check the Troubleshooting section above
- **useSend platform:** https://github.com/usesend/useSend/issues
- **AWS SES:** AWS Support or SES documentation

## License

This testing suite is provided as-is for testing your useSend instance.
