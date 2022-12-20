import fs from 'fs';
import path from 'path';
import test from 'ava';
import {part1, parseInstructions} from '../puzzles/day11';

const testData = fs.readFileSync(path.join(__dirname, '../inputs/day11.test.txt')).toString();

test('(day11:helper) #parseInstructions can parse the input', t => {
  const result = parseInstructions(testData);

  t.deepEqual(result[0], {
    starting: [79, 98],
    holding: [79, 98],
    totalHeld: 0,
    operation: {
      operation: 'multiply',
      value: 19
    },
    test: {
      divisible: 23, 
      yes: 2,
      no: 3 
    }
  });

  t.deepEqual(result[1], {
    starting: [54, 65, 75, 74],
    holding: [54, 65, 75, 74],
    totalHeld: 0,
    operation: {
      operation: 'add',
      value: 6
    },
    test: {
      divisible: 19,
      yes: 2,
      no: 0
    }
  });

  t.deepEqual(result[2], {
    starting: [79, 60, 97],
    holding: [79, 60, 97],
    totalHeld: 0,
    operation: {
      operation: 'multiply',
      value: 'old'
    },
    test: {
      divisible: 13,
      yes: 1,
      no: 3,
    },
  });

  t.deepEqual(result[3], {
    starting: [74],
    holding: [74],
    totalHeld: 0,
    operation: {
      operation: 'add',
      value: 3
    },
    test: {
      divisible: 17,
      yes: 0,
      no: 1,
    },
  });
});

test('(day11:part1) Returns the correct amount of monkey business', t => {
  const result = part1(testData);

  t.is(result, 10605);
});
