const uuid = require('uuid/v4');
const CockroachDbTester = require('./db');

(async () => {
    const tester = new CockroachDbTester();
    const id = uuid();

    await tester.insert(
        `
            insert into taxonomy (id, data) values ($1, $2)
            on conflict (id) do update set data = $2, modified_date = current_timestamp;
        `,
        [id, {
            text: 'some data',
            id,
        }]
    );

    tester.disconnect();
})();
