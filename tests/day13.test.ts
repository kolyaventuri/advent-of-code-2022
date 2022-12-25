import { loadInput } from '../utils/load-input';
import test from 'ava';
import {part1, part2, parseInput, validatePair, getPacketValidity, sortPackets, getArrayDepth} from '../puzzles/day13';

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

test('#validatePair test', t => {
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

test('(day13:helper) #getArrayDepth returns the correct depth of an array', t => {
  t.is(getArrayDepth([]), 0);
  t.is(getArrayDepth([[]]), 1);
  t.is(getArrayDepth([[[]]]), 2);

  
  t.is(getArrayDepth([[1], [2,3,4]]), 1);
  t.is(getArrayDepth([1,[2,[3,[4,[5,6,0]]]],8,9]), 4);

  t.is(getArrayDepth([[2], [2], [2, 3, [4]]]), 2);
});

const expectedSorted =
`[]
[[]]
[[[]]]
[1,1,3,1,1]
[1,1,5,1,1]
[[1],[2,3,4]]
[1,[2,[3,[4,[5,6,0]]]],8,9]
[1,[2,[3,[4,[5,6,7]]]],8,9]
[[1],4]
[[2]]
[3]
[[4,4],4,4]
[[4,4],4,4,4]
[[6]]
[7,7,7]
[7,7,7,7]
[[8,7,6]]
[9]`;
test('(day13:helper) #sortPackets can sort valid packets', t => {
  const pairs = parseInput(testData);

  const result = sortPackets(pairs);
  const expected = expectedSorted.split('\n').map(line => JSON.parse(line)); 

  console.log(result);
  console.log(expected);

  t.deepEqual(result, expected);
});

test('day13:part2) Returns the correct decoder key', t => {
  const result = part2(testData);

  t.is(result, 140);
});
