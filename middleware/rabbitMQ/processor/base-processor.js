class BaseProcessor {
	constructor(requestContext, workerName) {
		this.requestContext = requestContext;
		this.name = workerName;
	}

	processMessage(payload, ack) {
		console.log(this.name + ' processMessage with ', payload);

		//TODO. need to implementation

		ack();
	}

	onFailure(payload, channel, exchange, ack) {
		console.log(this.name + ' onFailure with payload: ', payload);

		//TODO. need to implementation

		ack();
	}
}

module.exports = BaseProcessor;