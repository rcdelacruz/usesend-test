import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const config = {
  apiKey: process.env.USESEND_API_KEY,
  baseUrl: process.env.USESEND_BASE_URL,
  sender: process.env.SENDER_EMAIL,
  recipient: process.env.RECIPIENT_EMAIL,
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  }
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

function logInfo(message) {
  log(`ℹ ${message}`, colors.cyan);
}

function logWarning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

// Test 1: REST API - Transactional Email
async function testRestAPI() {
  log('\n═══════════════════════════════════════', colors.blue);
  log('TEST 1: REST API - Transactional Email', colors.blue);
  log('═══════════════════════════════════════\n', colors.blue);

  try {
    const emailData = {
      from: config.sender,
      to: config.recipient,
      subject: `useSend API Test - ${new Date().toISOString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #4F46E5;">useSend API Test</h1>
          <p>This is a test email sent via the useSend REST API.</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <hr style="border: 1px solid #E5E7EB; margin: 20px 0;">
          <p style="color: #6B7280; font-size: 14px;">
            If you received this email, your useSend REST API is working correctly! 🎉
          </p>
        </div>
      `,
      text: `useSend API Test\n\nThis is a test email sent via the useSend REST API.\nTimestamp: ${new Date().toLocaleString()}\n\nIf you received this email, your useSend REST API is working correctly!`
    };

    logInfo(`Sending to: ${config.recipient}`);
    logInfo(`From: ${config.sender}`);
    logInfo(`API Endpoint: ${config.baseUrl}/api/v1/emails`);

    const response = await fetch(`${config.baseUrl}/api/v1/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify(emailData),
    });

    const responseData = await response.json();

    if (response.ok) {
      logSuccess('REST API test email sent successfully!');
      log(`Response: ${JSON.stringify(responseData, null, 2)}`, colors.cyan);
      return true;
    } else {
      logError('REST API test failed!');
      log(`Status: ${response.status}`, colors.red);
      log(`Response: ${JSON.stringify(responseData, null, 2)}`, colors.red);
      return false;
    }
  } catch (error) {
    logError(`REST API test error: ${error.message}`);
    console.error(error);
    return false;
  }
}

// Test 2: SMTP - Email Sending
async function testSMTP() {
  log('\n═══════════════════════════════════════', colors.blue);
  log('TEST 2: SMTP - Email Sending', colors.blue);
  log('═══════════════════════════════════════\n', colors.blue);

  try {
    logInfo(`SMTP Host: ${config.smtp.host}`);
    logInfo(`SMTP Port: ${config.smtp.port}`);
    logInfo(`SMTP Username: ${config.smtp.username}`);

    const transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: {
        user: config.smtp.username,
        pass: config.smtp.password,
      },
    });

    // Verify SMTP connection
    logInfo('Verifying SMTP connection...');
    await transporter.verify();
    logSuccess('SMTP connection verified!');

    const mailOptions = {
      from: config.sender,
      to: config.recipient,
      subject: `useSend SMTP Test - ${new Date().toISOString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #10B981;">useSend SMTP Test</h1>
          <p>This is a test email sent via the useSend SMTP server.</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <hr style="border: 1px solid #E5E7EB; margin: 20px 0;">
          <p style="color: #6B7280; font-size: 14px;">
            If you received this email, your useSend SMTP server is working correctly! 🚀
          </p>
        </div>
      `,
      text: `useSend SMTP Test\n\nThis is a test email sent via the useSend SMTP server.\nTimestamp: ${new Date().toLocaleString()}\n\nIf you received this email, your useSend SMTP server is working correctly!`
    };

    logInfo(`Sending SMTP email to: ${config.recipient}`);
    const info = await transporter.sendMail(mailOptions);

    logSuccess('SMTP test email sent successfully!');
    log(`Message ID: ${info.messageId}`, colors.cyan);
    log(`Response: ${info.response}`, colors.cyan);
    return true;
  } catch (error) {
    logError(`SMTP test error: ${error.message}`);
    console.error(error);
    return false;
  }
}

// Test 3: Configuration Check
function testConfiguration() {
  log('\n═══════════════════════════════════════', colors.blue);
  log('TEST 0: Configuration Check', colors.blue);
  log('═══════════════════════════════════════\n', colors.blue);

  const checks = [
    { name: 'API Key', value: config.apiKey },
    { name: 'Base URL', value: config.baseUrl },
    { name: 'Sender Email', value: config.sender },
    { name: 'Recipient Email', value: config.recipient },
    { name: 'SMTP Host', value: config.smtp.host },
    { name: 'SMTP Port', value: config.smtp.port },
    { name: 'SMTP Username', value: config.smtp.username },
    { name: 'SMTP Password', value: config.smtp.password },
  ];

  let allValid = true;
  for (const check of checks) {
    if (check.value) {
      logSuccess(`${check.name}: Set`);
    } else {
      logError(`${check.name}: Missing`);
      allValid = false;
    }
  }

  return allValid;
}

// Main test runner
async function runAllTests() {
  console.log('\n');
  log('╔═══════════════════════════════════════════╗', colors.blue);
  log('║   useSend Self-Hosted Testing Suite      ║', colors.blue);
  log('╚═══════════════════════════════════════════╝', colors.blue);

  const configValid = testConfiguration();

  if (!configValid) {
    logError('\nConfiguration check failed. Please check your .env file.');
    process.exit(1);
  }

  const results = {
    config: configValid,
    restAPI: false,
    smtp: false,
  };

  // Run REST API test
  results.restAPI = await testRestAPI();

  // Wait a bit between tests
  // await new Promise(resolve => setTimeout(resolve, 2000));

  // Run SMTP test (DISABLED)
  // results.smtp = await testSMTP();

  // Summary
  log('\n═══════════════════════════════════════', colors.blue);
  log('TEST SUMMARY', colors.blue);
  log('═══════════════════════════════════════\n', colors.blue);

  const summary = [
    { name: 'Configuration Check', passed: results.config },
    { name: 'REST API Test', passed: results.restAPI },
    { name: 'SMTP Test', passed: results.smtp },
  ];

  for (const test of summary) {
    if (test.passed) {
      logSuccess(`${test.name}: PASSED`);
    } else {
      logError(`${test.name}: FAILED`);
    }
  }

  const totalTests = summary.length;
  const passedTests = summary.filter(t => t.passed).length;

  log('\n───────────────────────────────────────', colors.cyan);
  log(`Total: ${passedTests}/${totalTests} tests passed`,
    passedTests === totalTests ? colors.green : colors.yellow);
  log('───────────────────────────────────────\n', colors.cyan);

  if (passedTests === totalTests) {
    logSuccess('🎉 All tests passed! Your useSend instance is working correctly.');
  } else {
    logWarning('⚠️  Some tests failed. Please check the errors above.');
  }

  process.exit(passedTests === totalTests ? 0 : 1);
}

// Run tests
runAllTests().catch(error => {
  logError(`Unexpected error: ${error.message}`);
  console.error(error);
  process.exit(1);
});
