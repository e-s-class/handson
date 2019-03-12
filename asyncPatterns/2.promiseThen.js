const path = './data';

const { readDirAsync, readFileAsync } = require('./util/fsPromise');

readDirAsync(path).then((files) => {
    const filePromises = files.map((file) => readFileAsync(`${path}/${file}`, 'utf-8'));

    return Promise.all(filePromises);
}).then((result) => {
    for(const data of result) {
        const { text } = JSON.parse(data);

        console.log(text);
    }
});
