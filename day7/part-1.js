const readline = require('readline');
const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename);

const readInterface = readline.createInterface({
  input: fs.createReadStream(root + '/input.txt'),
  output: process.stdout,
  console: false
});

const allRules = {};

readInterface
  .on('line', (line) => {
    const colorAndRules = line.split('contain');
    const color = colorAndRules[0].trim().replace('bags', '').trim();
    const unparsedBagRules = colorAndRules[1].split(',');
    const bagRules = {};
    unparsedBagRules.forEach((unparsedRule) => {
      let rule = unparsedRule.trim();
      if (rule !== 'no other bags.') {
        rule = rule.replace('.', '').replace('bags', '').replace('bag', '');
        bagRules[rule.substr(1).trim()] = parseInt(rule)
      }
    });
    allRules[color] = bagRules;
  })
  .on('close', () => {
    solve();
  });

let bagsWithGold = [];

const containsGold = (bagsToTest) => {
  if (bagsToTest.length === 0) {
    return false;
  }

  if (Object.keys(allRules[bagsToTest[0]]).includes('shiny gold') || bagsToTest.includes('shiny gold')) {
    return true;
  }

  bagsToTest = bagsToTest.concat(Object.keys(allRules[bagsToTest[0]]))
  bagsToTest.shift();

  if (bagsToTest[0]) {
    return containsGold(bagsToTest);
  }
}

const solve = () => {
  for (let color in allRules) {
    const bagsToTest = Object.keys(allRules[color]);
    if (containsGold(bagsToTest)) {
      bagsWithGold.push(color);
    }
  }
  console.log(bagsWithGold.length)
}


// { 'light red': { 'bright white': 1, 'muted yellow': 2 },
// 'dark orange': { 'bright white': 3, 'muted yellow': 4 },
// 'bright white': { 'shiny gold': 1 },
// 'muted yellow': { 'shiny gold': 2, 'faded blue': 9 },
// 'shiny gold': { 'dark olive': 1, 'vibrant plum': 2 },
// 'dark olive': { 'faded blue': 3, 'dotted black': 4 },
// 'vibrant plum': { 'faded blue': 5, 'dotted black': 6 },
// 'faded blue': {},
// 'dotted black': {} }
