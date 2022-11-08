const { readdir } = require('node:fs/promises');
const { stat } = require('fs');
const path = require('node:path');

const dirPath = path.join(__dirname, 'secret-folder');

const showFilesInfo = (dirPath) => {
  const folderObjs = readdir(dirPath, {withFileTypes: true});
  folderObjs.then((objData) => {
    for (const obj of objData) {
      if(obj.isFile()) {
        stat(path.join(dirPath, obj.name), (err, stats) => {
          if (err) throw Error(err.message);
          let result = path.parse(obj.name).name + ' - ' + path.extname(path.join(dirPath, obj.name)).substring(1) + ' - ' + `${(stats.size/1024).toFixed(3)}kb`;
          console.log(result);
        });
      }
      // else if(obj.isDirectory()){
      //   showFilesInfo(path.join(dirPath, obj.name));
      // }
    }
  })
}

showFilesInfo(dirPath);