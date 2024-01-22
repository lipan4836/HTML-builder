const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// main folders
const folderPath = path.join(__dirname, 'project-dir');
const stylesFolderPath = path.join(__dirname, 'styles');
const assetsFolderPath = path.join(__dirname, 'assets');
const assetsFolderCopyPath = path.join(folderPath, 'assets');
const componentsFolderPath = path.join(__dirname, 'components');

// main files
const templatePath = path.join(__dirname, 'template.html');
console.log(templatePath);

const htmlFilePath = path.join(__dirname, 'index.html');

const stylesFilePath = path.join(stylesFolderPath, 'style.css');

// const readStream = fs.createReadStream(template, 'utf8');
// readStream.on('data', (chunk) => console.log(chunk.toString()));

async function recreateFolder(folder) {
  await fsPromises.rm(folder, { recursive: true, force: true });
  await fsPromises.mkdir(folder, { recursive: true });
}

recreateFolder(folderPath);
