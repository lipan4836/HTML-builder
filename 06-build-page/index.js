const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// main folders
const folderPath = path.join(__dirname, 'project-dir');
const stylesFolderPath = path.join(__dirname, 'styles');
const assetsFolderPath = path.join(__dirname, 'assets');
const assetsFolderCopyPath = path.join(folderPath, 'assets');
const componentsFolderPath = path.join(__dirname, 'components');

console.log('folderPath --', folderPath);
console.log('stylesFolderPath --', stylesFolderPath);
console.log('assetsFolderPath --', assetsFolderPath);
console.log('assetsFolderCopyPath --', assetsFolderCopyPath);
console.log('componentsFolderPath --', componentsFolderPath);

// main files
const templatePath = path.join(__dirname, 'template.html');
console.log('templatePath --', templatePath);

const htmlFilePath = path.join(folderPath, 'index.html');
console.log('htmlFilePath --', htmlFilePath);

const stylesFilePath = path.join(folderPath, 'style.css');
console.log('stylesFilePath --', stylesFilePath);

// create project-dir
async function recreateFolder(folder) {
  await fsPromises.rm(folder, { recursive: true, force: true });
  await fsPromises.mkdir(folder, { recursive: true });
}

// copy assets to project-dir
async function copyFiles(folderOrig, folderCopy) {
  fsPromises.readdir(folderOrig, { withFileTypes: true }).then((files) => {
    files.forEach(async (file) => {
      const filePath = path.join(folderOrig, file.name);
      const filePathCopy = path.join(folderCopy, file.name);
      if (file.isFile()) {
        fsPromises.copyFile(filePath, filePathCopy);
      } else {
        const subFolder = path.join(folderOrig, file.name);
        const subFolderCopy = path.join(folderCopy, file.name);
        fsPromises.mkdir(subFolderCopy, { recursive: true });
        await copyDir(subFolder, subFolderCopy);
      }
    });
  });
}

async function copyDir(folderOrig, folderCopy) {
  try {
    await recreateFolder(folderCopy);
    await copyFiles(folderOrig, folderCopy);
  } catch (error) {
    console.log(error);
  }
}

// bundle css
async function bundleCss() {
  fs.readdir(stylesFolderPath, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.error(error.message);
      return;
    }

    const writeStream = fs.createWriteStream(stylesFilePath);
    files.forEach((file) => {
      if (path.parse(file.name).ext.slice(1) === 'css' && file.isFile()) {
        const filePath = path.join(stylesFolderPath, file.name);

        const readStream = fs.createReadStream(filePath, 'utf8');
        readStream.pipe(writeStream);
      }
    });
  });
}

// bundle html
async function bundleHtml() {
  const components = await fsPromises.readdir(componentsFolderPath, { withFileTypes: true });
  await fs.readFile(templatePath, 'utf-8').then(async (item) => {
    components.forEach((component) => {
      
    });
  });
}

// main function
async function buildProject() {
  await recreateFolder(folderPath);
  await copyDir(assetsFolderPath, assetsFolderCopyPath);
  await bundleCss();
}

buildProject();
