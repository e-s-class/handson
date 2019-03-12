const BaseMessenger = require('../base-messenger');

class MessageConsumer extends BaseMessenger {
	constructor(createConnection) {
		super(createConnection, {messaging: {}});
	}

	async processMessage(queue) {
		const ch = await this.getChannel();

		try {
			await ch.assertQueue(queue);
			await ch.consume(queue, (msg) => {
				if (msg !== null) {
					console.log(msg.content.toString());
					ch.ack(msg);
				}
			});
		} catch (err) {
			console.log('MessageConsumer throw ' + err);
			throw err;
		}
	}
}

module.exports = MessageConsumer;