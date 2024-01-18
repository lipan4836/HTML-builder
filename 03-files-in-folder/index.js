const { log } = require('console');
const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (error, files) => {
  error ? console.log(error) : null;
  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(__dirname, file.name);
      const fileExtension = path.extname(filePath);
      const fileName = path.basename(filePath, fileExtension);
      fs.stat(filePath, (error, stats) => {
        error ? console.log(error) : null;
        console.log(`${fileName}-${fileExtension}-${stats.size}`);
      });
    }
  });
});
