const workerConfig = require('../../../middleware/rabbitMQ/worker/order-notification-worker-config'),
		rabbitMqConnection = require('../../../middleware/rabbitMQ/messaging/rabbitmq-connection'),
		QueueWorker = require('../../../middleware/rabbitMQ/worker/queue-worker');

describe('rabbitMQ sample', async () => {
	let queueWorker = new QueueWorker('order-notification', workerConfig, rabbitMqConnection);
	await queueWorker.start();

	it('when publish message, then run processor with message ', () => {
		console.log('is print published message?');
	});
});