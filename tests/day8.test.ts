import test from 'ava';
import {getVisibility, scanDirection, part1, part2, rotateGrid, generateGrid, flatMerge, getTotalVisible, getViewDistance, getScenicScores} from '../puzzles/day8';

const testData =
`30373
25512
65332
33549
35390`;

test('(day8:helper) #rotateGrid can rotate a square grid', t => {
  const input = [
    [0, 1],
    [2, 3]
  ];
  const expected = [
    [0, 2],
    [1, 3]
  ];

  t.deepEqual(rotateGrid(input), expected);
});

test('(day8:helper) #rotateGrid can rotate a square grid back', t => {
  const input = [
    [0, 4, 1, 4],
    [1, 3, 9, 3],
    [2, 7, 3, 2],
    [3, 1, 4, 1],
  ];

  t.deepEqual(rotateGrid(rotateGrid(input)), input);
});

test('(day8:helper) #scanDirection can calculate up-facing visibility via rotation (real data)', t => {
/*
30373
25512
65332
33549
35390
*/
  const input = generateGrid(testData); 
  const expected = [
    [4, 1, 4, 8, 4],
    [-1, 5, 2, -6, -1],
    [3, 0, -2, -4, -1],
    [-3, -2, 0, -3, 6],
    [-3, 0, -2, 2, -9]
  ];

  t.deepEqual(scanDirection(input, 'up'), expected);
});

test('(day8:helper) #scanDirection can calculate down-facing visibility via rotation (real data)', t => {
/*
30373
25512
65332
33549
35390
*/
  const input = generateGrid(testData); 
  const expected = [
    [-3, -5, -2, -2, -6],
    [-4, 0, 0, -8, -7],
    [3, 0, -2, -6, -7],
    [0, -2, 2, -5, 9],
    [4, 6, 4, 10, 1],
  ];

  t.deepEqual(scanDirection(input, 'down'), expected);
});

test('(day8:helper) #scanDirection can calculate right-facing visibility via rotation (real data)', t => {
/*
30373
25512
65332
33549
35390
*/
  const input = generateGrid(testData); 
  const expected = [
    [-4, -7, -4, 4, 4],
    [-3, 0, 3, -1, 3],
    [1, 2, 0, 1, 3],
    [-6, -6, -4 , -5, 10],
    [-6, -4, -6, 9, 1]
  ];

  t.deepEqual(scanDirection(input, 'right'), expected);
});

test('(day8:helper) #scanDirection can calculate left-facing visibility via rotation (real data)', t => {
/*
30373
25512
65332
33549
35390
*/
  const input = generateGrid(testData); 
  const expected = [
    [4, -3, 0, 4, -4],  
    [3, 3, 0, -4, -3],
    [7, -1, -3, -3, -4],
    [4, 0, 2, -1, 4],
    [4, 2, -2, 4, -9]
  ];

  t.deepEqual(scanDirection(input, 'left'), expected);
});


test('(day8:helper) #getVisibility calculates the total merged visiblity', t => {
  const input = [
    [0, 5, 4],
    [4, 3, 5],
    [3, 6, 4]
  ];

  const expected = [true, true, true, true, false, true, true, true, true];
  t.deepEqual(getVisibility(input).merged, expected);
});

test('(day8:helper) #generatedGrid reads in the grid correctly', t => {
  const input = 
`054
435
364`;
  const expected = [
    [0, 5, 4],
    [4, 3, 5],
    [3, 6, 4]
  ];

  t.deepEqual(generateGrid(input), expected);
});

test('(day8:helper) #flatMerge merges the grids correctly', t => {
  const input = [
    [
      [4, 1, 4, 8, 4],    
      [-1, 5, 2, -6, -1],
      [3, 0, -2, -4, -1],
      [-3, -2, 0, -3, 6],
      [-3, 0, -2, 2, -9]
    ],
    [
      [-3, -5, -2, -2, -6],
      [-4, 0, 0, -8, -7],
      [3, 0, -2, -6, -7],
      [0, -2, 2, -5, 9],
      [4, 6, 4, 10, 1],
    ],
    [
      [-4, -7, -4, 4, 4],
      [-3, 0, 3, -1, 3],
      [1, 2, 0, 1, 3],
      [-6, -6, -4 , -5, 10],
      [-6, -4, -6, 9, 1]
    ],
    [
      [4, -3, 0, 4, -4],  
      [3, 3, 0, -4, -3],
      [7, -1, -3, -3, -4],
      [4, 0, 2, -1, 4],
      [4, 2, -2, 4, -9]
    ]
  ];
  
  const expected = [
    true, true, true, true, true,
    true, true, true, false, true,
    true, true, false, true, true,
    true, false, true, false, true,
    true, true, true, true, true
  ];

  const result = flatMerge(input);

  t.deepEqual(result, expected);
});

test('(day8:helper) #getTotalVisible gets the total visible (count of true)', t => {
  const input = [
    true, true, true, true, true,
    true, true, true, false, true,
    true, true, false, true, true,
    true, false, true, false, true,
    true, true, true, true, true
  ]

  const result = getTotalVisible(input);

  t.is(result, 21);
});

test('(day8:part1) Works for a smaller data set', t => {
const input = 
`0547
4356
3847
6932`;

  t.is(part1(input), 15);
});

test('(day8:part1) Returns the correct number of visible trees', t => {
  const result = part1(testData);
  t.is(result, 21);
});

test('(day8:helper) #getViewDistance generates the view distance for the up direction', t => {
  const input = generateGrid(`012
503
722`);

  const result = getViewDistance(input, 'up'); 
  const expected = [
    [1, 2, 1],
    [1, 1, 1],
    [0, 0, 0]
  ];

  t.deepEqual(result, expected);
});

test('(day8:helper) #getViewDistance generates the view distance for the down direction', t => {
  const input = generateGrid(`002
598
746`);

  const result = getViewDistance(input, 'down'); 
  const expected = [
    [0, 0, 0],
    [1, 1, 1],
    [2, 1, 1]
  ];

  t.deepEqual(result, expected);
});

test('(day8:helper) #getViewDistance generates the view distance for the left direction', t => {
  const input = generateGrid(`102
521
786`);

  const result = getViewDistance(input, 'left'); 
  const expected = [
    [2, 1, 0],
    [2, 1, 0],
    [1, 1, 0]
  ];

  t.deepEqual(result, expected);
});

test('(day8:helper) #getViewDistance generates the view distance for the right direction', t => {
  const input = generateGrid(`002
521
784`);

  const result = getViewDistance(input, 'right'); 
  const expected = [
    [0, 1, 2],
    [0, 1, 1],
    [0, 1, 1]
  ];

  t.deepEqual(result, expected);
});

test('(day8:helper) #getScenicScores generates the scenic score of each tree', t => {
  const input = generateGrid(`0012
5211
7894
9641`);

  const result = getScenicScores(input);
  const expected = [
    [0, 0, 0, 0],
    [0, 2, 1, 0],
    [0, 2, 4, 0],
    [0, 0, 0, 0]
  ];

  t.deepEqual(result, expected);
});

test('(day8:helper) #getScenicScores returns the right data for the real data', t => {
/*
30373
25512
65332
33549
35390
*/
  const trees = generateGrid(testData);
  const scores = getScenicScores(trees);

  t.is(scores[3][2], 8);
});

test('(day8:part2) Returns the highest scenic score', t => {
  const result = part2(testData);

  t.is(result, 8);
});
