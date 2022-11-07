const path = require('node:path');
const { readdir } = require('node:fs/promises');
const fs = require('fs');

const stylesDir = path.join(__dirname, 'styles');

let filesArray = [];

const folderObjs = readdir(stylesDir, {withFileTypes: true});
folderObjs.then((objData) => {
    for (const obj of objData) {                
        if(obj.isFile() && path.extname(path.join(stylesDir, obj.name)).substring(1).toLowerCase() === 'css') {
            const data = fs.readFileSync(path.join(stylesDir, obj.name)); //, function(err, data) {          
            filesArray.push(data.toString());
        }
    }

    console.log('filesArray.length: ',filesArray.length);
});