const path = require('node:path');
const { mkdir, copyFile, readdir } = require('node:fs/promises');

const fsPromises = require('fs/promises');

const createFilledTemplate = async (distDir) => {
    const templateData = await fsPromises.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf8' });    
    
    const headerComponent = await fsPromises.readFile(path.join(__dirname, 'components', 'header.html'), { encoding: 'utf8' }); 
    const articlesComponent = await fsPromises.readFile(path.join(__dirname, 'components', 'articles.html'), { encoding: 'utf8' }); 
    const footerComponent = await fsPromises.readFile(path.join(__dirname, 'components', 'footer.html'), { encoding: 'utf8' }); 
    const aboutComponent = await fsPromises.readFile(path.join(__dirname, 'components', 'about.html'), { encoding: 'utf8' }); 

    const filledTemplate = templateData.replace('{{header}}', headerComponent).replace('{{articles}}', articlesComponent).replace('{{footer}}', footerComponent).replace('{{about}}', aboutComponent);

    await fsPromises.writeFile(path.join(distDir, 'index.html'), filledTemplate);
}

const createDistDir = async () => {
    const distDirPath = path.join(__dirname, 'project-dist');
    await mkdir(distDirPath, { recursive: true });

    return distDirPath;
}

const createMergedStyles = async (distDir) => {
    let filesArray = [];

    const stylesDir = path.join(__dirname, 'styles');
    const objData = await readdir(stylesDir, {withFileTypes: true});

    for (const obj of objData) {                
        if(obj.isFile() && path.extname(path.join(stylesDir, obj.name)).substring(1).toLowerCase() === 'css') {
            const data = await fsPromises.readFile(path.join(stylesDir, obj.name), { encoding: 'utf8' });       
            filesArray.push(data.toString());
        }
    }

    await fsPromises.writeFile(path.join(distDir, 'style.css'), filesArray.join("\n \n"));
}

const copyAssets = async (sourceDir, distDir) => {
    const objData = await readdir(sourceDir, { withFileTypes: true });
    for (const obj of objData) {
        if (obj.isFile()) {
            await copyFile(path.join(sourceDir, obj.name), path.join(distDir, obj.name));
        }
        else if (obj.isDirectory()) {
            await mkdir(path.join(distDir, obj.name), { recursive: true });
            await copyAssets(path.join(sourceDir, obj.name), path.join(distDir, obj.name));
        }
    }
}

const exec = async () => {
    const distDir = await createDistDir();
    await createFilledTemplate(distDir);
    await createMergedStyles(distDir);
    await copyAssets(path.join(__dirname, 'assets'), path.join(distDir, 'assets'));
};
exec();