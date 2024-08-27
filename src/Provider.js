class EmailProvider {
    async sendEmail(email) {
        throw new Error('Method not implemented');
    }
}

class MockProvider extends EmailProvider {
    constructor() {
        super();
        this.name = 'MockProvider';
    }

    async sendEmail(email) {
        console.log(`[${this.name}] Sending email to ${email.to}`);
        if (Math.random() < 0.1) throw new Error('Random failure');
    }
}

class MockProvider2 extends EmailProvider {
    constructor() {
        super();
        this.name = 'MockProvider2';
    }

    async sendEmail(email) {
        console.log(`[${this.name}] Sending email to ${email.to}`);
        if (Math.random() < 0.2) throw new Error('Random failure');
    }
}

module.exports = { MockProvider, MockProvider2 };
