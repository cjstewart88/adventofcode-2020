const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { get } = require('http');
const root = path.dirname(require.main.filename);

const readInterface = readline.createInterface({
  input: fs.createReadStream(root + '/input.txt'),
  output: process.stdout,
  console: false
});

const boardingPasses = [];

readInterface
  .on('line', (line) => {
    if (line === '') return;
    boardingPasses.push(line.split(''));
  })
  .on('close', () => {
    console.log('end of file');
    solve();
  });

const secondHalf = (array) => {
  const half = Math.ceil(array.length / 2);
  array.splice(0, half);
}

const firstHalf = (array) => {
  const half = Math.ceil(array.length / 2);
  array.splice(-half);
}

const getRow = (bp) => {
  const rows = Array.from(Array(128).keys());
  const intructions = bp.slice(0, 7);
  intructions.forEach((direction) => {
    if (direction === 'F') {
      firstHalf(rows);
    } else {
      secondHalf(rows);
    }
  });
  return rows[0];
}

const getSeat = (bp) => {
  const seats = Array.from(Array(8).keys());
  const intructions = bp.slice(bp.length - 3);
  intructions.forEach((direction) => {
    if (direction === 'L') {
      firstHalf(seats);
    } else {
      secondHalf(seats);
    }
  });
  return seats[0];
}

const getSeatId = (bp) => {
  const row = getRow(bp);
  const seat = getSeat(bp);
  return (row * 8) + seat;
}

const solve = () => {
  const seatIds = [];
  boardingPasses.forEach((bp) => {
    seatIds.push(getSeatId(bp));
  });

  console.log(Math.max(...seatIds));
}
