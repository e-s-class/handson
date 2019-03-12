const path = './data';
const { readdir, readFile } = require('fs');
const { promisify } = require('util');

const readDirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);

(async () => {
    const files = await readDirAsync(path);

    for(const file of files) {
        const data = await readFileAsync(`${path}/${file}`, 'utf-8');

        const { text } = JSON.parse(data);

        console.log(text);
    }
})();

// serial, parallel