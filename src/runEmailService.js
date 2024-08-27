const EmailService = require('./EmailService');

const emailService = new EmailService();
const email = { id: '4', to: 'test@example.com', subject: 'Test Email', body: 'This is a test email.' };

(async () => {
    try {
        await emailService.sendEmail(email);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Failed to send email:', error);
    }
})();
