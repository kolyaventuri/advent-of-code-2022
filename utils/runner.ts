import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';

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
  require(`../puzzles/day${num}`);
} catch (error: unknown) {
  throw error;
}
