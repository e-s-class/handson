const redis = require('redis'),
      wrapper = require('co-redis'),
      MILLISECONDS = 1000;

class RedisConnection {
    constructor(config) {
        this.config = config;
    }

    getRedisClient(db, host, port) {
        const client = this.redisClient = redis.createClient(
            port,
            host,
            {
                retry_strategy: (options) => {
                    if (options.total_retry_time > ((this.config.totalRetryTimeInSeconds * MILLISECONDS) || (60 * 60 * MILLISECONDS))) {
                        console.log('RedisConnection', 'retry_strategy', options.err, { redisHost: host, redisPort: port });
                    } else {
                        return Math.min(options.attempt * 100, this.config.maxReconnectWaitTime || 2000);
                    }
                }, db: db
            }
        );

        this.redisClient.on('ready', () => {
            console.log('RedisConnection', 'ready', 'Connection to redis established');
        });

        this.redisClient.on('error', (err) => {
            console.log('RedisConnection', 'error', err);
        });

        this.redisClient.on('reconnecting', () => {
            console.log('RedisConnection', 'reconnecting', 'Attempting to reconnect to redis');
        });

        return wrapper(client);
    }
}

module.exports = RedisConnection;