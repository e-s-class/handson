const MessagePublisher = require('../../../middleware/rabbitMQ/messaging/queue/message-producer'),
		MessageConsumer = require('../../../middleware/rabbitMQ/messaging/queue/message-consumer'),
		rabbitMqConnection = require('../../../middleware/rabbitMQ/messaging/rabbitmq-connection');

describe('rabbitMQ sample', async () => {
	const QUEUE = 'sample';

	it('when sendToQueue, then produce message', () => {
		const messagePublisher = new MessagePublisher(rabbitMqConnection);
		messagePublisher.connect();
		messagePublisher.sendToQueue(QUEUE, 'hello message');
		console.log('Message produce is completed.');
	});

	it('when processMessage, then consume message', () => {
		const messageConsumer = new MessageConsumer(rabbitMqConnection);
		messageConsumer.connect();
		messageConsumer.processMessage(QUEUE);
	});
});