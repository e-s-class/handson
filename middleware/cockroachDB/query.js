const CockroachDbTester = require('./db');

(async () => {
    const tester = new CockroachDbTester();
    const data = await tester.filter('select data from taxonomy');

    console.log(data);

    tester.disconnect();
})();
