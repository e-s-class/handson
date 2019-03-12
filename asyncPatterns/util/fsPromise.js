const fs = require('fs');

const readDirAsync = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
};

const readFileAsync = (filePath, option) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, option, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const readFileAsync3Seconds = (filePath, option) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, option, (err, data) => {
            if (err) {
                reject(err);
            } else {
                setTimeout(() => {
                    resolve(data);
                    console.log(filePath, 'after 3 seconds');
                }, 3000);
            }
        });
    });
};

module.exports = {
    readDirAsync,
    readFileAsync,
    readFileAsync3Seconds,
};
