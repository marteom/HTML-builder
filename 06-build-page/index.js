const path = require('node:path');
const { mkdir, copyFile } = require('node:fs');

const distDir = path.join(__dirname, 'project-dist');

mkdir(distDir, { recursive: true }, (err) => {
    if (err) throw err;

    
});