import test from 'ava';
import {getVisibility, scanDirection, part1, rotateGrid, generateGrid, flatMerge, getTotalVisible} from '../puzzles/day8';

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
    [[4, 0], [1, 0], [4, 0], [8, 0], [4, 0]],    
    [[-1, 1], [5, 1], [2, 1], [-6, 1], [-1, 1]],
    [[3, 2], [0, 2], [-2, 2], [-4, 2], [-1, 2]],
    [[-3, 3], [-2, 3], [0, 3], [-3, 3], [6, 3]],
    [[-3, 4], [0, 4], [-2, 4], [2, 4], [-9, 4]]
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
  t.deepEqual(getVisibility(input), expected);
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

