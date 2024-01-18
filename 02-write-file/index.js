const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exit, stdin, stdout } = process;

const filePath = path.join(__dirname, 'text.txt');
const input = readline.createInterface(stdin);
const output = fs.createWriteStream(filePath);

stdout.write('Hello, my friend!!\nWhat do you want to say?\n\n');

function stop() {
  stdout.write('\nThat`s it? Ok, goodbye!\n');
  exit();
}

input.on('line', (text) => {
  if (text === 'exit') stop();

  output.write(`${text}`);
});

process.on('SIGINT', stop);
