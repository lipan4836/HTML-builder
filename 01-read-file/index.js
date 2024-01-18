const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const readStram = fs.createReadStream(filePath);
readStram.on('data', (chunk) => console.log(chunk.toString()));
