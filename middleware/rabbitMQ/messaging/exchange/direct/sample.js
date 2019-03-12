const QueueWorker = require('../../../worker/queue-worker');

(async () => {
	const worker = new QueueWorker('catalog-sync');
	await worker.start();
})();
