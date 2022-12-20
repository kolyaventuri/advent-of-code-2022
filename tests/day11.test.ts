import fs from 'fs';
import path from 'path';
import test from 'ava';
import {part1, part2, parseInstructions, doRound, getMod} from '../puzzles/day11';

const testData = fs.readFileSync(path.join(__dirname, '../inputs/day11.test.txt')).toString();

test('(day11:helper) #parseInstructions can parse the input', t => {
  const result = parseInstructions(testData);

  t.deepEqual(result[0], {
    holding: [79, 98],
    timesInspected: 0,
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
    holding: [54, 65, 75, 74],
    timesInspected: 0,
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
    holding: [79, 60, 97],
    timesInspected: 0,
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
    holding: [74],
    timesInspected: 0,
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

test('(day11:helper) #doRound performs the moves for all monkeys for that round', t => {
  const monkeys = parseInstructions(testData);
  const result = doRound(monkeys, getMod(monkeys));

  t.deepEqual(result[0], {
    holding: [20, 23, 27, 26],
    timesInspected: 2,
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
    holding: [2080, 25, 167, 207, 401, 1046],
    timesInspected: 4,
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
    holding: [],
    timesInspected: 3,
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
    holding: [],
    timesInspected: 5,
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

test('(day11:part1) Returns the correct amount of monkey business after 20 rounds', t => {
  const result = part1(testData);

  t.is(result, 10605);
});

test('(day11:part2) Returns the correct amount of monkey business after 10,000 rounds', t => {
  const result = part2(testData);

  t.is(result, 2713310158);
});

