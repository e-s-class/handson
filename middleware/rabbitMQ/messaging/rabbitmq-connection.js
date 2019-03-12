const amqp = require('amqplib');

function rabbitmqConnection() {
	return amqp.connect({
		protocol: 'amqp',
		hostname: 'rabbitmq',
		port: 5672,
		username: 'guest',
		password: 'guest'
	});
}

module.exports = rabbitmqConnection;