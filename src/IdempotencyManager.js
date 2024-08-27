class IdempotencyManager {
    constructor() {
        this.seenEmails = new Set();
    }

    isDuplicate(emailId) {
        if (this.seenEmails.has(emailId)) {
            return true;
        }
        this.seenEmails.add(emailId);
        return false;
    }
}

module.exports = IdempotencyManager;
