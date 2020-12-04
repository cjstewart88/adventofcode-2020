const readline = require('readline');
const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename);

const readInterface = readline.createInterface({
  input: fs.createReadStream(root + '/input.txt'),
  output: process.stdout,
  console: false
});

const passports = [[]];

readInterface
  .on('line', (line) => {
    if (line === "") {
      passports.push([{}]);
    } else {
      line.split(' ').map((kvp) => {
        const keyValuePair = kvp.split(':');
        passports[passports.length-1][keyValuePair[0]] = keyValuePair[1];
      });
    }
  })
  .on('close', () => {
    solve();
  });

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const solve = () => {
  console.log(passports.filter((passport) => {
    return requiredFields.every((requiredField) => passport.hasOwnProperty(requiredField));
  }).length)
};
