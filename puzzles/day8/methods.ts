import { log } from "../../utils/logger";

const generateGrid = (input: string): number[][] =>
  input.split('\n').map(line =>
    line.split('').map(n => Number.parseInt(n, 10)));


type Direction = 'up' | 'down' | 'left' | 'right';
const scanDirection = (trees: number[][], direction: Direction): boolean[][] => {
  let dir: number;
  switch (direction) {
    case 'up':
    case 'right':
      dir = 1;
      break;
    case 'down':
    case 'left':
      dir = -1;
      break;
  }

  const visibility = new Array(trees.length).fill(new Array(trees[0].length));
  if (direction === 'left' || direction === 'right') {
    for (let i = 0; i < trees.length; i++) {
      const row = trees[i];
      const firstIndex = direction === 'left' ? 0 : row.length - 1;
      const first = row[firstIndex];
      visibility[i] = row.map((tree, index) => {
        if (index === firstIndex) return true;
        return tree - first > 0;
      });
    }
  } else  {
    const _trees = direction === 'up' ? [...trees] : [...trees].reverse();
    for (let col = 0; col < _trees[0].length; col++) {
      for (let row = 0; row < _trees.length; row++) {
        log('Compare', _trees[row][col] to _trees[row][0])
        visibility[row][col] = _trees[row][col] - _trees[row][0] > 0;
      }
    }
  }

  return visibility;
};

export const getVisibility = (trees: number[][]): boolean[][] => {
  const visibility = new Array(trees.length).fill(new Array(trees[0].length));
  const left = scanDirection(trees, 'left');
  //log(left);
  const right = scanDirection(trees, 'right');
  //log(right);
  
  const up = scanDirection(trees, 'up');
  log(up);

  return visibility;
};

export const part1 = (input: string): number => {
  const trees = generateGrid(input);
  log(trees);
  const visible = getVisibility(trees);
  log(visible);

  const flat = visible.flat();
  const totalVisible: number = flat.map(n => (n ? 1 : 0) as number)
    .reduce((s = 0, i) => s += i);

  log('total', totalVisible);
  
  return totalVisible;
};
