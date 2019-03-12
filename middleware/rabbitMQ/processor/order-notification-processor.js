class OrderNotificationProcessor {
	constructor(requestContext) {
		this.requestContext = requestContext;
	}

	processMessage(payload, ack) {
		console.log('OrderNotificationProcessor processMessage with ', payload);

		//TODO. need to implementation

		ack();
	}

	onFailure(payload, channel, exchange, ack) {
		console.log('OrderNotificationProcessor onFailure with payload: ', payload);

		//TODO. need to implementation

		ack();
	}
}

module.exports = OrderNotificationProcessor;