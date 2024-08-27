const { MockProvider, MockProvider2 } = require('./Provider');
const RateLimiter = require('./RateLimiter');
const IdempotencyManager = require('./IdempotencyManager');
const CircuitBreaker = require('./CircuitBreaker');
const Logger = require('./Logger');
const Queue = require('./Queue');

class EmailService {
    constructor() {
        this.providers = [new MockProvider(), new MockProvider2()];
        this.rateLimiter = new RateLimiter();
        this.idempotencyManager = new IdempotencyManager();
        this.circuitBreaker = new CircuitBreaker(); // Optional
        this.queue = new Queue(); // Optional
    }

    async sendEmail(email) {
        if (this.idempotencyManager.isDuplicate(email.id)) {
            Logger.log(`Email ${email.id} is a duplicate.`);
            return;
        }

        await this.rateLimiter.waitForNextSlot();

        let providerIndex = 0;
        while (providerIndex < this.providers.length) {
            const provider = this.providers[providerIndex];
            try {
                if (this.circuitBreaker) {
                    await this.circuitBreaker.call(() => provider.sendEmail(email));
                } else {
                    await provider.sendEmail(email);
                }
                Logger.log(`Email sent successfully using ${provider.name}`);
                return;
            } catch (error) {
                Logger.log(`Failed to send email using ${provider.name}: ${error.message}`);
                providerIndex++;
            }
        }

        throw new Error('All providers failed to send the email.');
    }
}

module.exports = EmailService;
