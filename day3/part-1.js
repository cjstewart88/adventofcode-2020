const readline = require('readline');
const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename);

const readInterface = readline.createInterface({
  input: fs.createReadStream(root + '/input.txt'),
  output: process.stdout,
  console: false
});

let index = 3;
let numberOfTreesIncountered = 0;
let firstLine = true;
readInterface
  .on('line', (line) => {
    if (firstLine) {
      firstLine = false;
      return;
    }

    while (line[index] === undefined) {
      line += line
    }

    if (line[index] === '#') {
      numberOfTreesIncountered += 1;
    }
    index += 3;
  })
  .on('close', () => {
    console.log(numberOfTreesIncountered);
  });
