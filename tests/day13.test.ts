import { loadInput } from '../utils/load-input';
import test from 'ava';
import {part1, parseInput, validatePair} from '../puzzles/day13';

const input = 
`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[4]]
[1,[2]]

[[]]
[[],[]]

[[[]]]
[1]
`;
const testData = loadInput(13, true);

test('(day13:helper) #parseInput returns a list of inputs to compare', t => {
  const result = parseInput(input);
  const expected: any = [
    [
      [1,1,3,1,1],
      [1,1,5,1,1]
    ],
    [
      [[1], [4]],
      [1, [2]]
    ],
    [
      [[]],
      [[], []]
    ],
    [
      [[[]]],
      [1]
    ]
  ];

  t.deepEqual(result, expected);
});

test('#validatePair returns true for a valid pair', t => {
  const pairs = parseInput(input);
  const pair = pairs[0];

  const result = validatePair(pair);
  t.true(result);
});

test('#validatePair returns false for an invalid pair', t => {
  const pairs = parseInput(testData);
  const pair = pairs[2];

  const result = validatePair(pair);
  t.false(result);
});

test('#validatePair returns false for another invalid pair', t => {
  const other =
`[[1],[2,3,4]]
[[1],2,3,4]`;
  const pairs = parseInput(other);
  const result = validatePair(pairs[0]);

  t.false(result);
});

test('#validatePair returns true for a bunch of 0s', t => {
  const other =
`[0,0,0,0]
[0,0,0,0,0,0]`;
  const pairs = parseInput(other);
  const result = validatePair(pairs[0]);

  t.true(result);
});

test.skip('#validatePair test', t => {
  const data =
`[[2],[7]]
[[2, 6]]`;
  const pairs = parseInput(data);
  const result = validatePair(pairs[0]);

  t.true(result);
});

test('#validatePair test2', t => {
  const data =
`[[1], 2]
[1]`;
  const pairs = parseInput(data);
  const result = validatePair(pairs[0]);

  t.false(result);
});

test('#validatePair returns the correct responses for a list', t => {
  const pairs = parseInput(testData);
  const expected = [
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    false
  ];

  for (let i = 0; i < pairs.length; i++) {
    console.log(`\n[Validate #${i + 1}]`);
    const result = validatePair(pairs[i]);
    console.log('\n');
    t.is(result, expected[i], `Failed on #${i + 1} ${pairs[i]}`);
  }
});

test('(day13:part1) Returns the correct sum of indicies', t => {
  const result = part1(testData);

  t.is(result, 13);
});
