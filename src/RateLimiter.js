class RateLimiter {
    constructor(rateLimitMs = 1000) {
        this.lastSentTime = 0;
        this.rateLimitMs = rateLimitMs;
    }

    async waitForNextSlot() {
        const now = Date.now();
        const timeElapsed = now - this.lastSentTime;
        if (timeElapsed < this.rateLimitMs) {
            await new Promise(resolve => setTimeout(resolve, this.rateLimitMs - timeElapsed));
        }
        this.lastSentTime = Date.now();
    }
}

module.exports = RateLimiter;
