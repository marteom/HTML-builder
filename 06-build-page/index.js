const path = require('node:path');
const { mkdir, copyFile } = require('node:fs/promises');

const fsPromises = require('fs/promises');

const createFilledTemplate = async (distDir) => {
    const templateData = await fsPromises.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf8' });    
    
    const headerComponent = await fsPromises.readFile(path.join(__dirname, 'components', 'header.html'), { encoding: 'utf8' }); 
    const articlesComponent = await fsPromises.readFile(path.join(__dirname, 'components', 'articles.html'), { encoding: 'utf8' }); 
    const footerComponent = await fsPromises.readFile(path.join(__dirname, 'components', 'footer.html'), { encoding: 'utf8' }); 

    const filledTemplate = templateData.replace('{{header}}', headerComponent).replace('{{articles}}', articlesComponent).replace('{{footer}}', footerComponent);

    await fsPromises.writeFile(path.join(distDir, 'index.html'), filledTemplate);
}

const createDistDir = async () => {
    const distDirPath = path.join(__dirname, 'project-dist');
    await mkdir(distDirPath, { recursive: true });

    return distDirPath;
}

const exec = async () => {
    const distDir = await createDistDir();
    await createFilledTemplate(distDir);
};
exec();