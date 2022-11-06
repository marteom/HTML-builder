const { readdir } = require('node:fs/promises');
const fs = require('fs');
const path = require('node:path');

const dirPath = path.join(__dirname, 'secret-folder');

const folderObjs = readdir(dirPath, {withFileTypes: true});
folderObjs.then((objData) => {
  for (const obj of objData)
  console.log(obj.name, obj.isFile());
})