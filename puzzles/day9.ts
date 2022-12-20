import { log } from "../utils/logger";

type Direction = 'left' | 'right' | 'up' | 'down';
type Move = [Direction, number];
type Position = {
  x: number;
  y: number;
}; 

const abbrevMap: Record<string, Direction> = {
  L: 'left',
  R: 'right',
  U: 'up',
  D: 'down'
} as const;

const parseMoves = (input: string): Move[] => {
  const lines = input.split('\n').map(n => n.trim()).filter(n => !!n);
  log(`Parsing ${lines.length} instructions`);

  const result = lines.map((line: any, index): Move => {
    const pieces = line.split(' ');
    const direction = abbrevMap[pieces[0]];
    const amount = Number.parseInt(pieces[1]);
    if (!direction) {
      throw new Error(`Unrecognized direction ${pieces[0]} on instruction ${index} -- Got "${line}`);
    }
    if (Number.isNaN(amount) || !Number.isFinite(amount)) {
      throw new Error(`Invalid amount ${amount} on instruction ${index} -- Got "${line}"`);
    }
    if (amount < 1) {
      throw new Error(`Unexpected amount ${amount} on instruction ${index} -- Got "${line}"`);
    }

    return [direction, amount];
  });

  return result;
};

export const shouldMove = (direction: Direction, position: number): boolean => {
  switch (direction) {
    case 'up':
      if (position > 5) return true;
      break;
    case 'down':
      if (position < 4) return true;
      break;
    case 'left':
      if ([3, 5, 8].includes(position)) return true; 
      break;
    case 'right':
      if ([1, 4, 6].includes(position)) return true;
      break;
  }

  return false;
};

const getSize = (number: number): number => number < 0 ? -1 : 1;

const checkForUnlink = (positions: Position[]): boolean => {
  for (let i = 1; i < positions.length; i++) {
    const current = positions[i];
    const prev = positions[i - 1];
    const delta = Math.max(
      Math.abs(current.x - prev.x),
      Math.abs(current.y - prev.y)
    );

    if (delta > 1) return true;
  }

  return false;
}

const getMove = (chain: Position[], direction: Direction) => {
  let head: Position = {x: 0, y: 0};
  switch (direction) {
    case 'up':
      head = {x: 0, y: 1}; 
      break;
    case 'down':
      head = {x: 0, y: -1};
      break;
    case 'left':
      head = {x: -1, y: 0};
      break;
    case 'right':
      head = {x: 1, y: 0};
      break;
  } 

  const deltas: Position[] = [head];
  for (let i = 1; i < chain.length; i++) {
    let x = 0;
    let y = 0;

    const current = chain[i];
    const previous = chain[i - 1];
    const lastD = deltas[i - 1];

    const prevX = previous.x + lastD.x;
    const prevY = previous.y + lastD.y;

    const dX = prevX - current.x;
    const dY = prevY - current.y;

    const absDX = Math.abs(dX);
    const absDY = Math.abs(dY);

    if (absDX > 1) {
      x = 1 * getSize(dX);
      if (absDY === 1) {
        y = 1 * getSize(dY);
      }
    }

    if (absDY > 1) {
      y = 1 * getSize(dY);
      if (absDX === 1) {
        x = 1 * getSize(dX);
      }
    }

    log(`Move link ${i + 1} by`, {x, y})
    deltas.push({x, y});
  } 

  return deltas;
}

const positionMap: Record<string, number> = {
  '-11': 1,
  '01': 2,
  '11': 3,
  '-10': 4,
  '00': 0,
  '10': 5,
  '-1-1': 6,
  '0-1': 7,
  '1-1': 8
};

export const getRelativePosition = (head: Position, tail: Position): number => {
  const dx = tail.x - head.x;
  const dy = tail.y - head.y;

  return positionMap[`${dx}${dy}`];
};

type Size = {w: number; h: number};
const logMove = (inChain: Position[], size: Size, origin: Position): void => {
  const chain = [...inChain]; 
  const head = chain[0];
  const parts = chain.slice(1, chain.length - 1);
  const tail = chain[chain.length - 1];
  log(chain)

  const {x: hX, y: hY} = head;
  const {x: tX, y: tY} = tail;

  log(tY, tX);
  const rows: string[] = [];
  for (let i = 0; i < size.h; i++) {
    const out: string[] = [];
    for (let j = 0; j < size.w; j++) {
      let piece = '.';
      if (i === tY && j === tX) {
        piece = chain.length === 2 ? 'T' : (chain.length - 1).toString();
      }

      // TODO: Logic for rendering longer chains

      if (i === hY && j === hX) {
        piece = 'H';
      }

      out.push(piece);
    }
    rows.unshift(out.join(' '));
  }

  log(rows.join('\n'));
};

const performMove = (chain: Position[], direction: Direction): Position => {
  const deltas = getMove(chain, direction);
  log('Deltas', deltas)

  log('before', chain)
  for (let j = 0; j < deltas.length; j++) {
    chain[j] = {
      x: chain[j].x + deltas[j].x,
      y: chain[j].y + deltas[j].y,
    }
  }

  log('after', chain);

  const maxDelta = checkForUnlink(chain);
  if (maxDelta) {
    console.log(chain);
    throw new Error('Invalid position! Link in chain is detached');
  }

  const tail = chain[chain.length - 1];

  return tail;
}; 

const generateChain = (count: number): Position[] => {
  log(`Generating chain of length ${count}`);

  return new Array(count).fill({x: 0, y: 0});
};

export const part1 = (input: string): number => {
  const moves = parseMoves(input);
  const visitedPositions: string[] = ['0,0'];
  const chain = generateChain(2);

  log(moves);

  for (const [direction, amount] of moves) {
    log(`Move ${direction} ${amount} times`);
    for (let i = 0; i < amount; i++) {
      const tail = performMove(chain, direction);
      logMove(chain, {w: 6, h: 5}, {x: 0, y: 5});
      visitedPositions.push(`${tail.x},${tail.y}`);
    }
  }

  return new Set(visitedPositions).size;
};
