const readline = require('readline');
const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename);

const readInterface = readline.createInterface({
  input: fs.createReadStream(root + '/input.txt'),
  output: process.stdout,
  console: false
});

const answerGroups = [[]];

readInterface
  .on('line', (line) => {
    if (line === '') {
      answerGroups.push([]);
      return;
    }
    answerGroups[answerGroups.length-1].push(line.split(''));
  })
  .on('close', () => {
    solve();
  });

const solve = () => {
  let count = 0;
  answerGroups.forEach((group) => {
    const yesAnswers = [];
    group.flat().forEach((answer) => {
      if (group.flat().filter((a) => a === answer).length === group.length) {
        if (!yesAnswers.includes(answer)) {
          yesAnswers.push(answer);
        }
      }
    });
    count += yesAnswers.length;
  });
  console.log(count)
}
