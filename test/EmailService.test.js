const EmailService = require('../src/EmailService');
const { MockProvider, MockProvider2 } = require('../src/Provider');

describe('EmailService', () => {
    let emailService;
    let mockProvider1;
    let mockProvider2;

    beforeEach(() => {
        mockProvider1 = new MockProvider();
        mockProvider2 = new MockProvider2();
        emailService = new EmailService();
        emailService.providers = [mockProvider1, mockProvider2];
    });

    it('should send an email successfully with the first provider', async () => {
        jest.spyOn(mockProvider1, 'sendEmail').mockResolvedValue();
        jest.spyOn(mockProvider2, 'sendEmail').mockResolvedValue();
        const email = { id: '1', to: 'test@example.com', subject: 'Test', body: 'Test body' };
        await expect(emailService.sendEmail(email)).resolves.not.toThrow();
    });

    it('should fallback to the second provider if the first fails', async () => {
        jest.spyOn(mockProvider1, 'sendEmail').mockRejectedValue(new Error('Fail'));
        jest.spyOn(mockProvider2, 'sendEmail').mockResolvedValue();
        const email = { id: '2', to: 'test@example.com', subject: 'Test', body: 'Test body' };
        await expect(emailService.sendEmail(email)).resolves.not.toThrow();
    });

    it('should throw an error if all providers fail', async () => {
        jest.spyOn(mockProvider1, 'sendEmail').mockRejectedValue(new Error('Fail'));
        jest.spyOn(mockProvider2, 'sendEmail').mockRejectedValue(new Error('Fail'));
        const email = { id: '3', to: 'test@example.com', subject: 'Test', body: 'Test body' };
        await expect(emailService.sendEmail(email)).rejects.toThrow('All providers failed to send the email.');
    });
});
