const path = require('node:path');
const { mkdir, copyFile } = require('node:fs/promises');

const fsPromises = require('fs/promises');

const distDir = path.join(__dirname, 'project-dist');

const createDistDir = async (distDir) => {
    await mkdir(distDir, { recursive: true });

    const templateData = await fsPromises.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf8' });    
    
    const headerComponent = await fsPromises.readFile(path.join(__dirname, 'components', 'header.html'), { encoding: 'utf8' }); 
    const articlesComponent = await fsPromises.readFile(path.join(__dirname, 'components', 'articles.html'), { encoding: 'utf8' }); 
    const footerComponent = await fsPromises.readFile(path.join(__dirname, 'components', 'footer.html'), { encoding: 'utf8' }); 

    //console.log(footerComponent.toString());

}

createDistDir(distDir);