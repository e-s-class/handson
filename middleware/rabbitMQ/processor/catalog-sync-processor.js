const BaseProcessor = require('./base-processor');

class CatalogSyncProcessor extends BaseProcessor {
	constructor(requestContext, workerName) {
		super(requestContext, workerName);
	}
}

module.exports = CatalogSyncProcessor;