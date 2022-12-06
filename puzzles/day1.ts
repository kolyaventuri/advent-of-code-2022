import { loadInput } from "../utils/load-input";

const input = loadInput(1); 

const elves = input.split('\n\n');
let totals: number[] = [];

for (const elf of elves) {
  const counts = elf.split('\n').map(n => Number.parseInt(n, 10));
  const sum = counts.reduce((s = 0, i) => s += i);

  totals.push(sum);
}

totals = totals.sort((a, b) => b - a);

console.log('Part 1:', totals[0]);

const part2 = totals[0] + totals[1] + totals[2];
console.log('Part 2:', part2);
