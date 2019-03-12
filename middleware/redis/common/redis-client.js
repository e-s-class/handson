const _ = require('lodash'),
		  RedisConnection = require('./redis-connection');

class RedisClient {
	constructor(redisConfig) {
		this.redisConfig = redisConfig;
		this.redisConnection = new RedisConnection(redisConfig);
		this.redisCoClient = this.redisConnection.getRedisClient(redisConfig.db, redisConfig.host, redisConfig.port);
		this.defaultExpTime = 7200;
	}

	_getKeyString(key) {
		let keyString = key;
		// Redis key must be a string (Otherwise, it is converted internally using toString() method)
		if (typeof key === 'object') {
			// Prefix is used to avoid collision with exisiting keys
			keyString = `PREFIX:${JSON.stringify(key)}`;
		}
		return keyString;
	}

	async set(key, val, expireTime) {
		expireTime = expireTime || this.defaultExpTime;
		if (_.isNil(key) || _.isNil(val)) {
			return;
		}
		if (this.redisConnection) {
			try {
				let keyString = this._getKeyString(key);
				let valString = val;
				if (typeof val === 'object') {
					valString = JSON.stringify(val);
				}
				return this.redisCoClient.set(keyString, valString, 'EX', expireTime);
			} catch (err) {
				return null;
			}
		} else {
			return null;
		}
	}

	async get(key) {
		if (this.redisConnection) {
			try {
				if (_.isNil(key)) {
					return;
				}
				let keyString = this._getKeyString(key);
				let val = await this.redisCoClient.get(keyString);
				let valString = val;
				try {
					valString = JSON.parse(val);
					return valString;
				} catch (err) {
					return valString;
				}
			} catch (err) {
				return null;
			}
		} else {
			return null;
		}
	}

	async del(key) {
		if (this.redisConnection) {
			try {
				if (_.isNil(key)) {
					return;
				}
				let keyString = this._getKeyString(key);
				return this.redisCoClient.del(keyString);
			} catch (err) {
				return null;
			}
		} else {
			return null;
		}
	}

	async setAdd(set, member) {
		if (this.redisConnection) {
			try {
				return this.redisCoClient.sadd([set, member]);
			} catch (err) {
				return null;
			}
		} else {
			return null;
		}
	}

	async getSet(set) {
		if (this.redisConnection) {
			try {
				return this.redisCoClient.smembers(set);
			} catch (err) {
				return null;
			}
		} else {
			return null;
		}
	}

	async setRemove(set, member) {
		if (this.redisConnection) {
			try {
				return this.redisCoClient.srem([set, member]);
			} catch (err) {
				return null;
			}
		} else {
			return null;
		}
	}

	async close() {
		try {
			if (this.redisConnection) {
				return this.redisCoClient.quit();
			} else {
				if (this.redisConnection) {
					await this.redisCoClient.quit();
				}

				if (this.redisConnection) {
					await this.redisCoClient.quit();
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = RedisClient;