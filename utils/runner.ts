import fs from 'fs';
import path from 'path';
import yargs from 'yargs/yargs';
import chalk from 'chalk';
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

type Validator = {
  low: number[],
  high: number[],
  wrong: number[],
  correct: number | null
};
type Validators = {
  part1: Validator;
  part2: Validator;
}

const validate = (validator: Validator, result: number) => {
  if (validator.low.length > 0) {
    const max = Math.max(...validator.low);
    if (result <= max) {
      console.warn(chalk.red(`!! According to your previous answers, ${chalk.bold.green(result)} is too low!`));
      console.warn(`The answer must be ${chalk.bold('greater')} than ${chalk.bold(max)}`);
    }
  }
  if (validator.high.length > 0) {
    const min = Math.min(...validator.low);
    if (result >= min) {
      console.warn(chalk.red(`!! According to your previous answers, ${chalk.bold.green(result)} is too high!`));
      console.warn(`The answer must be ${chalk.bold('less')} than ${chalk.bold(min)}`);
    }
  }

  if (validator.wrong.length > 0) {
    const exists = validator.wrong.some(n => n === result);
    if (exists) {
      console.warn(chalk.red(`!! According to your previous answers, ${chalk.bold.green(result)} was flagged wrong!`));
      console.error(`The answer likely can ${chalk.bold('not')} be ${chalk.bold(result)}`);
    }
  }

  if (validator.correct !== null && validator.correct !== result) {
    console.warn(chalk.red(`!! According to your previous answers, ${chalk.bold.green(validator.correct)} was the correct answer!`));
    console.error(`The answer can not possibly be ${chalk.bold(result)}`);
  }
}

const runPuzzle = (puzzle: string) => {
  console.log(`===========\n[PUZZLE ${puzzle}]\n===========\n\n`);
  const {part1, part2} = require(`../puzzles/day${puzzle}`);
  const input = loadInput(puzzle);
  const validators: Validators = {
    part1: {
      low: [],
      high: [],
      wrong: [],
      correct: null
    },
    part2: {
      low: [],
      high: [],
      wrong: [],
      correct: null
    }
  };
  try {
    const data = require(`../validators/day${puzzle}`);
    validators.part1.low = data.part1?.low ?? [];
    validators.part2.low = data.part2?.low ?? [];

    validators.part1.high = data.part1?.high ?? [];
    validators.part2.high = data.part2?.high ?? [];

    validators.part1.wrong = data.part1?.wrong ?? [];
    validators.part2.wrong = data.part2?.wrong ?? [];

    validators.part1.correct = data.part1?.correct ?? null;
    validators.part2.correct = data.part2?.correct ?? null;
  } catch (error) {
    console.error(error)
  }

  if (part1) {
    const part1res = part1(input);
    console.log('Part 1:', part1res);
    validate(validators.part1, part1res);
  } else {
    console.warn(`!! No part1 method exported for puzzle ${puzzle}`);
  }

  if (part2) {
    const part2res = part2(input);
    console.log('Part 2:', part2res);
    validate(validators.part2, part2res);
  } else {
    console.warn(`!! No part2 method exported for puzzle ${puzzle}`);
  }
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
