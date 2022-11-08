
const path = require('node:path');
const { readdir, mkdir, copyFile, rm } = require('node:fs/promises');

const sourceDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

const copyDir = async (sourceDir, destDir) => {

    await rm(destDir, {recursive: true});
    await mkdir(destDir, { recursive: true });

    const objData = await readdir(sourceDir, { withFileTypes: true });
    for (const obj of objData) {
        if (obj.isFile()) {
            await copyFile(path.join(sourceDir, obj.name), path.join(destDir, obj.name));
        }
        else if (obj.isDirectory()) {
            await mkdir(path.join(destDir, obj.name), { recursive: true });
            await copyDir(path.join(sourceDir, obj.name), path.join(destDir, obj.name));
        }
    }
}

const exec = async () => {
    await copyDir(sourceDir, destDir);
};
exec();