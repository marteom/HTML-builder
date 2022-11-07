const path = require('node:path');
const { readdir } = require('node:fs/promises');

const stylesDir = path.join(__dirname, 'styles');

const folderObjs = readdir(stylesDir, {withFileTypes: true});
folderObjs.then((objData) => {
    for (const obj of objData) {                
        if(obj.isFile() && path.extname(path.join(stylesDir, obj.name)).substring(1).toLowerCase() === 'css') {
            console.log(obj.name);
        }
    }
});