import fs from 'fs';
import path from 'path';
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';
import { loadInput } from './load-input';

const argv = yargs(hideBin(process.argv)).options({
  test: { type: 'boolean', default: false, alias: 't' },
  debug: { type: 'boolean', default: false, alias: 'd'},
}).parseSync();

const num = argv._[0] as string;
const isTest = argv.test || argv.t; 
const isDebug = argv.debug || argv.d;
if (isTest) {
  process.env.IS_TEST = 'true';
}

if (isDebug) {
  process.env.IS_DEBUG = 'true';
}

const runPuzzle = (puzzle: string) => {
  console.log(`===========\n[PUZZLE ${puzzle}]\n===========\n\n`);
  const {part1, part2} = require(`../puzzles/day${puzzle}`);
  const input = loadInput(puzzle);

  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
};

if (!num || Number.isNaN(Number.parseInt(num, 10))) {
  console.log('No puzzle provided, running everything...');
  const data = fs.readdirSync(path.join(__dirname, '../puzzles'));
  const files = data.map(d => d.split('.')[0])
    .filter(s => s.startsWith('day'))
    .map(s => s.replace(/\D/g, ''));
    console.log(files)

  for (const puzzle of files) {
    try {
      runPuzzle(puzzle);
    } catch (error: unknown) {
      console.error(error);
    }
  }
  process.exit(0);
}

try {
  runPuzzle(num); 
} catch (error: unknown) {
  console.warn(`You may not have anything written for puzzle ${num}!`);
  throw error;
}
