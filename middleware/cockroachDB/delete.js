const CockroachDbTester = require('./db');

(async () => {
    const tester = new CockroachDbTester();
    await tester.delete('delete from taxonomy ORDER BY id DESC LIMIT 1');

    tester.disconnect();
})();
