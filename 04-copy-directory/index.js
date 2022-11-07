
const { mkdir, copyFile } = require('node:fs');
const path = require('node:path');
const { readdir } = require('node:fs/promises');

const sourceDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

const copyDir = (sourceDir, destDir) => {
    mkdir(destDir, { recursive: true }, (err) => {
        if (err) throw err;
        const folderObjs = readdir(sourceDir, {withFileTypes: true});
        folderObjs.then((objData) => {
        for (const obj of objData) {                
            if(obj.isFile()) {
                copyFile(path.join(sourceDir, obj.name), path.join(destDir, obj.name), (err) => {
                    if (err) throw err;
                });
            }
            else if(obj.isDirectory()){
                mkdir(path.join(destDir, obj.name), { recursive: true }, (err) => {
                    if (err) throw err;
                    copyDir(path.join(sourceDir, obj.name), path.join(destDir, obj.name));
                });
            }
        }
        });
    })
}

copyDir(sourceDir, destDir);