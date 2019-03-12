const CockroachDbTester = require('./db');

(async () => {
    const tester = new CockroachDbTester();
    const { id } = await tester.getById('select id from taxonomy ORDER BY id DESC LIMIT 1');

    await tester.update('UPDATE taxonomy SET data = $1 WHERE id = $2', [{
        id,
        text: 'update data',
    }, id]);

    tester.disconnect();
})();
