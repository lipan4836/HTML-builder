const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (error, files) => {
  error ? console.log(error.message) : null;
  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(folderPath, file.name);
      const fileName = path.parse(filePath).name;
      const fileExtension = path.parse(filePath).ext.slice(1);
      fs.stat(filePath, (error, stats) => {
        error ? console.log(error.message) : null;
        console.log(
          `${fileName}-${fileExtension}-${(stats.size / 1024).toFixed(2)}kb`,
        );
      });
    }
  });
});
