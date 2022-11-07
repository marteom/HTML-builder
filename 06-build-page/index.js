const path = require('node:path');
const { mkdir, copyFile } = require('node:fs/promises');

const distDir = path.join(__dirname, 'project-dist');


const createDistDir = async (distDir) => {
    await mkdir(distDir, { recursive: true });
}

createDistDir(distDir);