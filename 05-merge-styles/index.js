const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const stylesBundleFolder = path.join(__dirname, 'project-dist');

const stylesBudleFile = path.join(stylesBundleFolder, 'bundle.css');
const stream = fs.createWriteStream(stylesBudleFile);

fs.readdir(stylesFolder, { withFileTypes: true }, (error, files) => {
  error ? console.log(error.message) : null;

  for (let file of files) {
    if (path.parse(file.name).ext.slice(1) === 'css' && file.isFile()) {
      const filePath = path.join(stylesFolder, file.name);

      const readStream = fs.createReadStream(filePath);
      readStream.pipe(stream);
    }
  }
});
