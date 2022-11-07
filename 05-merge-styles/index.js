const path = require('node:path');
const { readdir } = require('node:fs/promises');
const fs = require('fs');
const fsPromises = require('fs/promises');

const stylesDir = path.join(__dirname, 'styles');
const bundleDir = path.join(__dirname, 'project-dist');

let filesArray = [];

const folderObjs = readdir(stylesDir, {withFileTypes: true});
folderObjs.then(async (objData) => {
    for (const obj of objData) {                
        if(obj.isFile() && path.extname(path.join(stylesDir, obj.name)).substring(1).toLowerCase() === 'css') {
            const data = await fsPromises.readFile(path.join(stylesDir, obj.name), { encoding: 'utf8' });       
            filesArray.push(data.toString());
        }
    }

    outputStream = fs.createWriteStream(path.join(bundleDir, 'bundle.css'), {flags: 'a'});

    for(const cssData of filesArray) {
        outputStream.write('\n' + cssData);
    }

    outputStream.end();
    
});