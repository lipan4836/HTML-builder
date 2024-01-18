const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (error, files) => {
  error ? console.log(error) : null;
  console.log(files);
});
