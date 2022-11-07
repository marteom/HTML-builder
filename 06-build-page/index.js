const path = require('node:path');
const { mkdir, copyFile } = require('node:fs/promises');

const fsPromises = require('fs/promises');

const distDir = path.join(__dirname, 'project-dist');

const createDistDir = async (distDir) => {
    await mkdir(distDir, { recursive: true });

    const templateData = await fsPromises.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf8' });       
    //console.log(templateData.toString());


}

createDistDir(distDir);