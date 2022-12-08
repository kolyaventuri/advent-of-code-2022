import { log } from "../../utils/logger";

export const generateGrid = (input: string): number[][] =>
  input.split('\n').map(line =>
    line.split('').map(n => Number.parseInt(n, 10)));

// Swaps rows for columns
export const rotateGrid = <T>(grid: T[][]): T[][] => {
  const flipped: typeof grid = new Array(grid[0].length).fill(new Array(grid.length));
  for (let j = 0; j < grid[0].length; j++) {
    const newRow: T[] = [];
    for (let i = 0; i < grid[0].length; i++) {
      const index = i % grid.length;
      newRow.push(grid[index][j]);
      //log(`[${index}][${j}] => [${j}][${index}] = ${grid[index][j]}`)
    }

    flipped[j] = newRow;
  }

  return flipped;
}

type Direction = 'up' | 'down' | 'left' | 'right';
export const calculateVisibility = (trees: number[][], direction: 'left' | 'right'): boolean[][] => {
  const visibility = new Array(trees.length).fill(new Array(trees[0].length));

  for (let i = 0; i < trees.length; i++) {
    const row = trees[i];
    const firstIndex = direction === 'left' ? 0 : row.length - 1;
    const first = row[firstIndex];
    visibility[i] = row.map((tree, index) => {
      if (index === firstIndex) return true;
      return tree - first > 0;
    });
  }

  return visibility;
};
export const scanDirection = (trees: number[][], direction: Direction): boolean[][] => {
  if (direction === 'left' || direction === 'right') {
    return calculateVisibility(trees, direction);
  }

  const flipped = rotateGrid(trees); 
  const result = calculateVisibility(flipped, direction === 'up' ? 'left' : 'right');

  return rotateGrid(result);
};

const flatMerge = <T>(grids: Array<T[][]>): boolean[] => {
  const flattened = grids.map(g => g.flat());
  log(flattened);

  let result: T[] = [];
  for (const list of flattened) {
    for (let i = 0; i < list.length; i++) {
      result[i] ||= list[i];
    }
  }

  return result.map(n => !!n);
};

export const getVisibility = (trees: number[][]): boolean[] => {
  const left = scanDirection(trees, 'left');
  log('l', left);
  const right = scanDirection(trees, 'right');
  log('r', right);
  
  const up = scanDirection(trees, 'up');
  log('u', up);
  const down = scanDirection(trees, 'down');
  log('d', down);

  const merged = flatMerge([left, right, up, down]);
  log('merged', merged);

  return merged;
};

export const part1 = (input: string): number => {
  const trees = generateGrid(input);
  log(trees);
  const visible = getVisibility(trees);
  log(visible);

  const totalVisible: number = visible.map(n => (n ? 1 : 0) as number)
    .reduce((s = 0, i) => s += i);

  log('total', totalVisible);
  
  return totalVisible;
};
