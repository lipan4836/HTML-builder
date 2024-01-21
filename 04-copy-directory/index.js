const fs = require('fs');
const path = require('path');

async function copyFiles(folderOriginal, folderCopy) {
  fs.readdir(folderOriginal, { withFileTypes: true }).then((files) => {
    files.forEach((file) => {
      const filePath = path.join(folderOriginal, file.name);
      const filePathCopy = path.join(folderCopy, file.name);
      if (file.isFile()) {
        fs.copyFile(filePath, filePathCopy);
      } else {
        fs.mkdir(filePathCopy, { recursive: true });
        copyFiles(filePath, filePathCopy);
      }
    });
  });
}

async function copyDir() {
  const folderPath = path.join(__dirname, 'files');
  const folderPathCopy = path.join(__dirname, 'files-copy');
}
