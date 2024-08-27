class CircuitBreaker {
    constructor(failureThreshold = 5, resetTimeoutMs = 30000) {
        this.isOpen = false;
        this.failureCount = 0;
        this.failureThreshold = failureThreshold;
        this.resetTimeoutMs = resetTimeoutMs;
    }

    async call(fn) {
        if (this.isOpen) {
            throw new Error('Circuit breaker is open');
        }
        try {
            const result = await fn();
            this.failureCount = 0;
            return result;
        } catch (error) {
            this.failureCount++;
            if (this.failureCount >= this.failureThreshold) {
                this.isOpen = true;
                setTimeout(() => this.isOpen = false, this.resetTimeoutMs);
            }
            throw error;
        }
    }
}

module.exports = CircuitBreaker;
