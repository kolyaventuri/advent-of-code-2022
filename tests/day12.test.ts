import test from 'ava';
import {part1, part2, parseHeightMap, getSurroundingTiles} from '../puzzles/day12';

const testData = 
`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const sampleSet =
`abc
adc
gef`;

const tinySet = 
`Sds
bct
`;

test('(day12:helper) #getSurroundingTiles given a map, can find the surrouding valid tiles', t => {
  const map = [
    [1, 2, 3],
    [1, 4, 3],
    [7, 5, 6]
  ];

  const result = getSurroundingTiles(map, 2, 1);
  const expected = [
    [1, 1], // Left
    [2, 0], // Up
  ];

  t.deepEqual(result, expected);
});

test('(day12:helper) #parseHeightMap can parse the start and end nodes', t => {
  const {graph, start, end} = parseHeightMap(testData);
  console.log(graph)
  t.deepEqual(start, [0]);
  t.is(end, 21);
});

test('(day12:helper) #parseHeightMap can parse ALL possible start and end nodes', t => {
  const {start, end} = parseHeightMap(testData, true);
  t.deepEqual(start, [0, 1, 8, 16, 24, 32]);
  t.is(end, 21);
});


test('(day12:part1) Returns the correct number of steps', t => {
  const result = part1(testData);

  t.is(result, 31);
});

test('(day12:part2) Returns the correct number of steps, for all possible starting points', t => {
  const result = part2(testData);

  t.is(result, 29);
});

