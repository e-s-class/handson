const BaseMessenger = require('../base-messenger');

class MessageProducer extends BaseMessenger {
	constructor(createConnection) {
		super(createConnection, { messaging: {}});
	}

	async sendToQueue(queue, message) {
		const ch = await this.getChannel();

		try {
			await ch.assertQueue(queue);
			ch.sendToQueue(queue, Buffer.from(message));
		} catch (err) {
			console.log('MessageProducer throw ', err);
			throw err;
		}
	}
}

module.exports = MessageProducer;