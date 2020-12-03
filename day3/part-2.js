const readline = require('readline');
const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename);

const readInterface = readline.createInterface({
  input: fs.createReadStream(root + '/input.txt'),
  output: process.stdout,
  console: false
});

const map = [];

readInterface
  .on('line', (line) => map.push(line.repeat(75)))
  .on('close', () => solve());


const slopes = [[1,1], [3,1], [5,1], [7,1], [1,2]];
let treesPerSlope = [];
const solve = () => {
  for (let i = 0; i < slopes.length; i++) {
    let numberOfTreesIncountered = 0;
    let x = 0;
    let y = 0;
    const spacesToMoveRight = slopes[i][0];
    const spacesToMoveDown = slopes[i][1];
    map.forEach(() => {
      x += spacesToMoveRight;
      y += spacesToMoveDown;
      if (map[y] && map[y][x] === '#') {
        numberOfTreesIncountered += 1;
      }
    });
    treesPerSlope.push(numberOfTreesIncountered)
  }

  console.log(treesPerSlope.reduce((a, b) => a * b))
}
