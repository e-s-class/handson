const fs = require('fs');

const path = './data';

fs.readdir(path, (err, files) => {
    files.forEach(file => {
        fs.readFile(`${path}/${file}`, 'utf-8', (err, data) => {
            const { text } = JSON.parse(data);

            console.log(text);
        });
    });
});
