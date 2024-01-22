const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// main folders
const folderPath = path.join(__dirname, 'project-dir');
const stylesFolderPath = path.join(__dirname, 'styles');
const assetsFolderPath = path.join(__dirname, 'assets');
const assetsFolderCopyPath = path.join(folderPath, 'assets');
const componentsFolderPath = path.join(__dirname, 'components');

console.log('folderPath', folderPath);
console.log('stylesFolderPath', stylesFolderPath);
console.log('assetsFolderPath', assetsFolderPath);
console.log('assetsFolderCopyPath', assetsFolderCopyPath);
console.log('componentsFolderPath', componentsFolderPath);

// main files
const templatePath = path.join(__dirname, 'template.html');
console.log('templatePath', templatePath);

const htmlFilePath = path.join(folderPath, 'index.html');
console.log('htmlFilePath', htmlFilePath);

const stylesFilePath = path.join(folderPath, 'style.css');
console.log('stylesFilePath', stylesFilePath);

// const readStream = fs.createReadStream(template, 'utf8');
// readStream.on('data', (chunk) => console.log(chunk.toString()));

async function recreateFolder(folder) {
  await fsPromises.rm(folder, { recursive: true, force: true });
  await fsPromises.mkdir(folder, { recursive: true });
}

recreateFolder(folderPath);
