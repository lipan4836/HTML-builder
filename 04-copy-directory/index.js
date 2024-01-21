const fs = require('fs').promises;
const path = require('path');
const { stdout } = require('process');

async function recreateFolder(folderCopy) {
  await fs.rm(folderCopy, { recursive: true, force: true });
  await fs.mkdir(folderCopy, { recursive: true });
}

async function copyFiles(folderOrig, folderCopy) {
  fs.readdir(folderOrig, { withFileTypes: true }).then((files) => {
    files.forEach(async (file) => {
      const filePath = path.join(folderOrig, file.name);
      const filePathCopy = path.join(folderCopy, file.name);
      if (file.isFile()) {
        fs.copyFile(filePath, filePathCopy);
      }
    });
  });
}

async function copyDir() {
  const folderPath = path.join(__dirname, 'files');
  const folderPathCopy = path.join(__dirname, 'files-copy');

  try {
    await recreateFolder(folderPathCopy);
    await copyFiles(folderPath, folderPathCopy);
    stdout.write('\nAll data has been copied successfully\n\n');
  } catch (error) {
    console.log(error);
  }
}

copyDir();
