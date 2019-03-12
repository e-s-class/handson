const pgp = require('pg-promise')();

// Database connection details;
const cn = {
    host: 'cockroachdb', // 'localhost' is the default;
    port: 26257, // 5432 is the default;
    database: 'test_database',
    user: 'root',
};

const db = pgp(cn); // database instance;

class CockroachDbTester {
    constructor() {
        this.db = db;
    }

    async filter(sqlCmd, values, tx = this.db) {
        return tx.any(sqlCmd, values);
    }

    async getById(sqlCmd, values, tx = this.db) {
        return tx.oneOrNone(sqlCmd, values);
    }

    async insert(...args) {
        return this._none(...args);
    }

    async update(...args) {
        return this._none(...args);
    }

    async delete(...args) {
        return this._none(...args);
    }

    async _none(sqlCmd, values, tx = this.db) {
        return tx.none(sqlCmd, values);
    }

    disconnect() {
        console.log('end');
        db.$pool.end();
    }
}

module.exports = CockroachDbTester;

