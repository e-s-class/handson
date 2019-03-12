const QueueWorker = require('../../../middleware/rabbitMQ/worker/queue-worker');

describe('rabbitMQ sample', async () => {
	let queueWorker = new QueueWorker('order-notification');
	await queueWorker.start();

	it('when publish message, then run processor with message ', () => {
		console.log('is print published message?');
	});
});