const BaseProcessor = require('./base-processor');

class OrderNotificationProcessor extends BaseProcessor {
	constructor(requestContext, workerName) {
		super(requestContext, workerName);
	}
}

module.exports = OrderNotificationProcessor;