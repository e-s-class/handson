const uuid = require('uuid');

class BaseMessenger {
	constructor(rabbitMqConnection, workerConfig) {
		this.rabbitMqConnection = rabbitMqConnection;
		this.messagingConfig = workerConfig.messaging;
	}

	async connect() {
		this.connection = await this.rabbitMqConnection();
		this.connection.on('close', (e) => {
			this._handleRabbitMQError(e);
		});
		this.connection.on('error', (e) => {
			this._handleRabbitMQError(e);
		});
	}

	async getChannel() {
		try {
			if (!this.connection) {
				await this.connect();
			}

			return this.connection.createConfirmChannel();
		} catch (err) {
			console.log('BaseMessenger throw ', err);
			throw err;
		}
	}

	_handleRabbitMQError(error) {
		console.log('BaseMessenger', '_handleRabbitMQError', error);
		// return retry(caller.reconnect(this), { interval: 30 * 1000, factor: 2, retries: 7 }); //retries for 30s, 60s, 120s, 240s so on.
	}

	async createChannelToExchange(exchange, exchangeId) {
		try {
			const queues = this.getExchangeBindings(exchangeId);
			queues.forEach(async(q) => {
				console.log('BaseMessenger createChannelToExchange queue:', q, ', exchange:', exchange);
				await this._bindQueueToExchange(q, exchange);
			})
		} catch (err) {
			console.log('BaseMessenger', 'createChannelToExchange', err, {exchange, exchangeId});
			throw err;
		}
	}

	getExchangeBindings(exchangeId) {
		return this.messagingConfig.bindings[exchangeId];
	}

	async _bindQueueToExchange(queue, exchange) {
		try {
			let channel = await this.getChannel();
			this._setPrefetch(channel);
			let q = queue;
			if (exchange.bindQueue) {
				console.log('MessageConsumer', '_bindQueueToExchange', `Binding queue ${q} to exchange ${exchange.name}`);
				await channel.bindQueue(q, exchange.name, '');
			}
			await channel.consume(q, this.processMessage(queue, exchange.name, channel));
		} catch (e) {
			console.log('BaseMessenger', '_bindQueueToExchange', e, queue, exchange.name);
			process.exit(1);
		}
	}

	_setPrefetch(channel) {
		channel.prefetch(this.messagingConfig.prefetchCount || 25);
	}

	processMessage(queue, exchange, channel) {
		console.log('BaseMessenger', 'processMessage', 'Method Not Implemented', queue, exchange, channel)
	}

	_generateNewRequestContext () {
		return {id: uuid.v4()};
	}
}

module.exports = BaseMessenger;