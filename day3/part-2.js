// Works with the example input, but not with my actual input
// im clearly missing something, but hanging up my hat on this one

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename);

const readInterface = readline.createInterface({
  input: fs.createReadStream(root + '/input.txt'),
  output: process.stdout,
  console: false
});

const slopes = [[1,1], [3,1], [5,1], [7,1], [1,2]];
const slopeTrees = [];
for (let i = 0; i < slopes.length; i++) {
  let index = slopes[i][0];
  let numberOfTreesIncountered = 0;
  let lineCounter = slopes[i][1];

  readInterface
    .on('line', (line) => {
      if (lineCounter === slopes[i][1]) {
        lineCounter += 1;
        return;
      }

      while (line[index] === undefined) {
        line += line
      }

      if (line[index] === '#') {
        numberOfTreesIncountered += 1;
      }

      index += slopes[i][0];
      lineCounter += slopes[i][1];
    })
    .on('close', () => {
      slopeTrees.push(numberOfTreesIncountered);
      if (i === slopes.length-1) {
        console.log('last slope tested!')
        console.log(slopeTrees);
        console.log(slopeTrees.reduce((a, b) => a * b))
      }
    });
}
