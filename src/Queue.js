class Queue {
    constructor() {
        this.items = [];
        this.processing = false;
    }

    async add(item, processFn) {
        this.items.push(item);
        if (!this.processing) {
            this.processing = true;
            while (this.items.length > 0) {
                const currentItem = this.items.shift();
                if (currentItem) {
                    await processFn(currentItem);
                }
            }
            this.processing = false;
        }
    }
}

module.exports = Queue;
