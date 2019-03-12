const MessageConsumer = require('../messaging/exchange/message-consumer'),
		workerConfig = require('./worker-config.json'),
		rabbitMqConnection = require('../messaging/rabbitmq-connection');

class QueueWorker {
	constructor(workerName) {
		this.workerName = workerName;
		this.workerConfig = workerConfig[workerName];
		this.rabbitMqConnection = rabbitMqConnection;
	}

	async start() {
		try {
			this.messageConsumer = new MessageConsumer(this.workerName, this.workerConfig, this.rabbitMqConnection);
			await this.messageConsumer.connect();
			await this.messageConsumer.drainMessages();
			console.log('QueueWorker successfully is started');
		} catch (err) {
			console.log('QueueWorker start failed', err);
		}
	}
}

module.exports = QueueWorker;