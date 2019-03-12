const co = require('co');

const path = './data';

const { readDirAsync, readFileAsync } = require('./util/fsPromise');

co(function* () {
    const files = yield readDirAsync(path);

    for(const file of files) {
        const data = yield readFileAsync(`${path}/${file}`, 'utf-8');
        const { text } = JSON.parse(data);

        console.log(text);
    }
});