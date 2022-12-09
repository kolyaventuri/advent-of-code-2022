import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';
import { loadInput } from './load-input';

const argv = yargs(hideBin(process.argv)).argv

// @ts-expect-error
const num = argv._[0];
const isTest = argv.test || argv.t; 
const isDebug = argv.debug || argv.d;
if (isTest) {
  process.env.IS_TEST = 'true';
}

if (isDebug) {
  process.env.IS_DEBUG = 'true';
}

if (num === null) {
  throw new Error('No puzzle provided');
}

try {
  console.log(`===========\n[PUZZLE ${num}]\n===========\n\n`);
  const {part1, part2} = require(`../puzzles/day${num}`);
  const input = loadInput(num);

  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
} catch (error: unknown) {
  console.warn(`You may not have anything written for puzzle ${num}!`);
  throw error;
}
