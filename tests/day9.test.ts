import test from 'ava';
import { part1, part2, shouldMove, getRelativePosition } from '../puzzles/day9';

const testData = 
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

test('(day9:part1) Returns the correct number of tail positions visited', t => {
  const result = part1(testData);

  t.is(result, 13);
});

const testData2 =
`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

test('(day9:part2) Returns the correct number of tail positions visited', t => {
  const result = part2(testData2);

  t.is(result, 36);
});

/*
1 2 3
4 * 5
6 7 8
*/

test('(day9:helper) #shouldMove returns true for UP move valid positions', t => {
  for (const position of [6, 7, 8]) {
    const result = shouldMove('up', position);

    t.true(result, `Should've moved UP for position ${position}`);
  }
});

test('(day9:helper) #shouldMove returns FALSE for UP move invalid positions', t => {
  for (const position of [1, 2, 3, 4, 5]) {
    const result = shouldMove('up', position);

    t.false(result, `Should not move UP for position ${position}`);
  }
});

test('(day9:helper) #shouldMove returns true for DOWN move valid positions', t => {
  for (const position of [1, 2, 3]) {
    const result = shouldMove('down', position);

    t.true(result, `Should've moved DOWN for position ${position}`);
  }
});

test('(day9:helper) #shouldMove returns FALSE for DOWN move invalid positions', t => {
  for (const position of [4, 5, 6, 7, 8]) {
    const result = shouldMove('down', position);

    t.false(result, `Should not move DOWN for position ${position}`);
  }
});

test('(day9:helper) #shouldMove returns true for LEFT move valid positions', t => {
  for (const position of [3, 5, 8]) {
    const result = shouldMove('left', position);

    t.true(result, `Should've moved LEFT for position ${position}`);
  }
});

test('(day9:helper) #shouldMove returns FALSE for LEFT move invalid positions', t => {
  for (const position of [1, 2, 4, 6, 7]) {
    const result = shouldMove('left', position);

    t.false(result, `Should not move LEFT for position ${position}`);
  }
});

test('(day9:helper) #shouldMove returns true for RIGHT move valid positions', t => {
  for (const position of [1, 4, 6]) {
    const result = shouldMove('right', position);

    t.true(result, `Should've moved RIGHT for position ${position}`);
  }
});

test('(day9:helper) #shouldMove returns FALSE for RIGHT move invalid positions', t => {
  for (const position of [2, 3, 5, 7, 8]) {
    const result = shouldMove('right', position);

    t.false(result, `Should not move RIGHT for position ${position}`);
  }
});

test('(day9:helper) #getRelativePosition returns the correct position', t => {
  const trials = [
    [{x: 0, y: 0}, {x: 0, y: 0}, 0],
    [{x: 0, y: 0}, {x: -1, y: 0}, 4],
    [{x: 5, y: 7}, {x: 6, y: 6}, 8],
    [{x: 4, y: 9}, {x: 4, y: 10}, 2],
    [{x: -6, y: -5}, {x: -7, y: -4}, 1]
  ] as any[];

  for (const trial of trials) {
    const [head, tail, expected] = trial;

    const result = getRelativePosition(head, tail);

    t.is(result, expected, `Expected ${expected} for head @ ${JSON.stringify(head)} and tail @ ${JSON.stringify(tail)}`);
  }
});
