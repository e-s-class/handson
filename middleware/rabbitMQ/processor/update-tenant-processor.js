const BaseProcessor = require('./base-processor');

class UpdateTenantProcessor extends BaseProcessor {
	constructor(requestContext, workerName) {
		super(requestContext, workerName);
	}
}

module.exports = UpdateTenantProcessor;