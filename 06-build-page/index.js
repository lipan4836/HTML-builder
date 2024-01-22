const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// const template =

async function recreateFolder(folder) {
  await fsPromises.rm(folder, { recursive: true, force: true });
  await fsPromises.mkdir(folder, { recursive: true });
}

const folderPath = path.join(__dirname, 'project-dir');
recreateFolder(folderPath);
