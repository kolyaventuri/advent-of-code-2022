import { loadInput } from "../utils/load-input";

const input = loadInput(4);

const pairs = input.split('\n').filter(n => !!n);

// Part 1
let sum = 0;

for (const pair of pairs) {
  const sectionSpread = pair.split(',');
  const sections = sectionSpread.map(spread => spread.split('-').map(n => Number.parseInt(n, 10)));

  const [min, max] = sections[0];
  const [min2, max2] = sections[1];

  if (min2 >= min && max2 <= max) {
    sum += 1;
  } else if (min >= min2 && max <= max2) {
    sum += 1;
  }
}

console.log('Part 1:', sum);

// Part 2
sum = 0;
for (const pair of pairs) {
  const sectionSpread = pair.split(',');
  const sections = sectionSpread.map(spread => spread.split('-').map(n => Number.parseInt(n, 10)));

  const [min, max] = sections[0];
  const [min2, max2] = sections[1];

  if (max < min2) continue;
  if (min > max2) continue;

  sum += 1;
}

console.log('Part 2:', sum);

