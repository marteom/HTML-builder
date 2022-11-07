
const { mkdir, copyFile } = require('node:fs');
const path = require('node:path');


mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) throw Error(err.message);
  });