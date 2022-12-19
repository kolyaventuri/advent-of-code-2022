import { log } from "../utils/logger";

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
export const calculateVisibility = (trees: number[][], direction: 'left' | 'right'): number[][] => {
  const visibility = new Array(trees.length).fill(new Array(trees[0].length));

  for (let i = 0; i < trees.length; i++) {
    const row = direction === 'right' ? [...trees[i]].reverse() : trees[i];

    let tallest = -1;
    const newRow: number[] = [];
    for (let j = 0; j < row.length; j++) {
      const tree = row[j];
      const isVisible = tree - tallest;
      if (isVisible > 0) tallest = tree;
      newRow[j] = isVisible;
    } 
    visibility[i] = direction === 'left' ? newRow : newRow.reverse();
  }

  return visibility;
};
export const scanDirection = (trees: number[][], direction: Direction): number[][] => {
  if (direction === 'left' || direction === 'right') {
    return calculateVisibility(trees, direction);
  }

  const flipped = rotateGrid(trees); 
  const result = calculateVisibility(flipped, direction === 'up' ? 'left' : 'right');

  return rotateGrid(result);
};

export const flatMerge = <T>(grids: Array<T[][]>): boolean[] => {
  const flattened = grids.map(g => g.flat());
  log(flattened);

  let result: boolean[] = [];
  for (const list of flattened) {
    for (let i = 0; i < list.length; i++) {
      result[i] ||= list[i] > 0;
    }
  }

  log(result);
  return result;
};

export const getVisibility = (trees: number[][]) => {
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

  return {merged, up, down, left, right};
};

export const calculateViewDistance = (trees: number[][], direction: 'left' | 'right'): number[][] => {
  log(direction)
  const out = `grid:\n${trees.map(row =>
    row.join(' ')
  ).join('\n')}`
  log(out);
  const distance = new Array(trees.length).fill(new Array(trees[0].length).fill(0));

  for (let i = 0; i < trees.length; i++) {
    const row = direction === 'right' ? [...trees[i]].reverse() : trees[i];
    log(`-- row ${i}`)

    const newRow: number[] = [];
    for (let j = 0; j < row.length; j++) {
      const tree = row[j];
      log(`---- col ${j} (${tree})`)
      let view = 0;
      for (let k = j + 1; k < row.length; k++) {
        const tree2 = row[k];
        log(`------ cmp ${k} (${tree2}) -- ${tree < tree2}`);
        view += 1;
        if (tree <= tree2) break;
      }

      log(`------ view: ${view}`)

      newRow[j] = view;
    } 
    distance[i] = direction === 'left' ? newRow : newRow.reverse();
  } 

  return distance;
};

export const getViewDistance = (trees: number[][], direction: Direction): number[][] => {
  if (direction === 'left' || direction === 'right') {
    const distance = calculateViewDistance(trees, direction);
    const final = `distance:\n${distance.map(row =>
      row.join(' ')
    ).join('\n')}`
    log(final);

    return distance;
  }

  const flipped = rotateGrid(trees); 
  const distance = calculateViewDistance(flipped, direction === 'up' ? 'left' : 'right');
  const result = rotateGrid(distance);
    const final = `distance:\n${result.map(row =>
      row.join(' ')
    ).join('\n')}`
    log(final);

  return result;
};

export const getScenicScores = (trees: number[][]): number[][] => {
  const viewDistances = ['left', 'right', 'up', 'down'].map((direction: any): number[][] =>
    getViewDistance(trees, direction));

  const scenicScores = viewDistances[0];
  for (let i = 1; i < viewDistances.length; i++) {
    const grid = viewDistances[i];
    for (let j = 0; j < grid.length; j++) {
      for (let k = 0; k < grid[j].length; k++) {
        scenicScores[j][k] *= grid[j][k];
      }
    }
  }

  log(scenicScores);

  return scenicScores;
};

export const getTotalVisible = (visible: boolean[]): number =>
  visible.map((n: any): number => n ? 1 : 0)
    .reduce((s = 0, i) => s += i);

export const part1 = (input: string): number => {
  const trees = generateGrid(input);
  log(trees);
  const visible = getVisibility(trees);
  log(visible);

  const totalVisible = getTotalVisible(visible.merged); 

  log('total', totalVisible);
  
  return totalVisible;
};

export const part2 = (input: string): number => {
  const trees = generateGrid(input);
  log(trees);
  const scores = getScenicScores(trees);
  const flat = scores.flat();
  log(flat);

  return Math.max(...flat);
};
