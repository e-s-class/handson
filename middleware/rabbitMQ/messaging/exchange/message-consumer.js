const BaseMessenger = require('../base-messenger'),
		OrderNotificationProcessor = require('../../processor/order-notification-processor');

class MessageConsumer extends BaseMessenger {
	constructor(workerName, workerConfig, rabbitMqConnection) {
		super(rabbitMqConnection, workerConfig);
		this.workerName = workerName;
	}

	async drainMessages() {
		try {
			console.log('MessageConsumer', 'drainMessages', 'Starting message consumer');
			for (const key in this.messagingConfig.exchanges) {
				await this.createChannelToExchange(this.messagingConfig.exchanges[key], key);
			}
		} catch (err) {
			console.log('MessageConsumer', 'drainMessages', err);
			throw err;
		}
	}

	processMessage(queue, exchange, channel) {
		console.log('BaseMessenger processMessage queue:', queue, ', exchange:', exchange);
		return (msg) => {
			let requestContext = this._generateNewRequestContext();
			if (msg) {
				console.log('MessageConsumer', 'processMessage', 'Receiving message', {
					content: msg.content.toString(),
					requestId: requestContext.id
				});

				try {
					let payload;
					// TODO. workerName에 따라 메세지를 처리할 processor 정의
					let messageProcessor;
					switch (this.workerName) {
						case 'order-notification':
							messageProcessor = new OrderNotificationProcessor(requestContext);
							break;
						default:
							console.log('Unknown worker with ' + this.workerName);
					}

					try {
						payload = JSON.parse(msg.content.toString());
						messageProcessor.processMessage(payload, this._ackMessage(channel, msg));
					} catch (e) {
						console.log('MessageConsumer', 'processMessage', e, {requestId: requestContext.id});
						//TODO. 메세지를 재처리해야 하는 경우 nack 응답
						if (e && this._shouldNack(e)) {
							channel.nack(msg);
						}
						else {
							messageProcessor.onFailure(payload, channel, exchange, this._ackMessage(channel, msg));
						}
					}
				} catch (err) {
					console.log('MessageConsumer', 'processMessage', err);
					channel.ack(msg);
				}
			}
		};
	}

	_shouldNack(e) {
		let errors = [
			{
				statusCode: 400,
				error: 'ConditionUnmetRetryLater',
				message: 'The message was rejected because conditions were not met. Requeuing..'
			}
		];
		return (e.constructor && e.constructor.name == 'nack-error-name') || _.includes(errors, e.error);
	}

	_ackMessage(channel, msg) {
		return () => channel.ack(msg);
	}
}

module.exports = MessageConsumer;