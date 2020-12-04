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

const heightValidator = (hgt) => {
  if (!hgt) { return false; }
  const measurement = parseInt(hgt);
  if (!measurement) { return false }

  const unit = hgt.substr(hgt.length -2);

  if (unit === 'cm') {
    return measurement >= 150 && measurement <= 193
  } else if (unit === 'in') {
    return measurement >= 59 && measurement <= 76
  } else {
    return false;
  }
}

const solve = () => {
  console.log(passports.filter((passport) =>
    (passport.byr && passport.byr.length === 4 && parseInt(passport.byr) >= 1920 && parseInt(passport.byr) <= 2002) &&
    (passport.iyr && passport.iyr.length === 4 && parseInt(passport.iyr) >= 2010 && parseInt(passport.iyr) <= 2020) &&
    (passport.eyr && passport.eyr.length === 4 && parseInt(passport.eyr) >= 2020 && parseInt(passport.eyr) <= 2030) &&
    (heightValidator(passport.hgt)) &&
    (passport.hcl && passport.hcl.match(/^#[0-9a-f]{6}/i)) &&
    (passport.ecl && passport.ecl.length === 3 && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport.ecl)) &&
    (passport.pid && passport.pid.length === 9 && passport.pid.match(/^\d+$/))
  ).length)
};
