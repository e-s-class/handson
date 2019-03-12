const assert = require('assert'),
		RedisClient = require('../../middleware/redis/common/redis-client'),
		redisConfig = require('../../middleware/redis/common/redis-config.json');

describe('redis', () => {
	const KEY = 'chennai';
	let redisClient;

	before(() => {
		redisClient = new RedisClient(redisConfig);
	});

	after(async () => {
		await redisClient.close();
	});

	it('when add value by key, then value should be found by get', async () => {
		await redisClient.set(KEY, 'escape');
		const result = await redisClient.get(KEY);
		assert.equal(result, 'escape');
	});

	it('given after complete to set value, when del value by key,' +
			' then delete value', async () => {
		await redisClient.set(KEY, 'escape');
		await redisClient.del(KEY);
		const empty = await redisClient.get(KEY);
		assert.equal(empty, null);
	});

	it('when sadd members by key, then members should be found by getSet',
			async () => {
				await redisClient.setAdd(KEY, 'welcome');
				await redisClient.setAdd(KEY, 'is incredible');
				const members = await redisClient.getSet(KEY);
				assert.deepEqual(members, ['is incredible', 'welcome']);
			});

	it('given after complete to sadd members, when setRemove members, ' +
			'then value does not contain members ', async () => {
		await redisClient.setAdd(KEY, 'welcome');
		await redisClient.setAdd(KEY, 'is incredible');

		await redisClient.setRemove(KEY, "is incredible");
		const members = await redisClient.getSet(KEY);
		assert.deepEqual(members, ['welcome']);
	});
});