const QueueWorker = require('../../../worker/queue-worker');

(async () => {
	const worker = new QueueWorker('update-tenant');
	await worker.start();
})();
