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

const getMaxDelta = (position: {head: Position; tail: Position}) => Math.max(
  Math.abs(position.head.x - position.tail.x),
  Math.abs(position.head.y - position.tail.y),
);

const getMove = (currentPosition: {head: Position, tail: Position}, direction: Direction) => {
  let x = 0;
  let y = 0;

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

  const newHeadX = currentPosition.head.x + head.x;
  const dX = newHeadX - currentPosition.tail.x;

  const newHeadY = currentPosition.head.y + head.y;
  const dY = newHeadY - currentPosition.tail.y;

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

  return {
    head,
    tail: {x, y}
  };
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

const logMove = (currentPosition: {head: Position, tail: Position}): void => {
  const {
    head: {x: hX, y: hY},
    tail: {x: tX, y: tY}
  } = currentPosition;

  log(tY, tX);
  const rows: string[] = [];
  for (let i = 0; i < 5; i++) {
    const out: string[] = [];
    for (let j = 0; j < 6; j++) {
      if (i === tY && j === tX) {
        out.push('T');
        continue;
      } 
      if (i === hY && j === hX) {
        out.push('H');
        continue;
      }

      out.push('.');
    }
    rows.unshift(out.join(' '));
  }

  log(rows.join('\n'));
};

export const part1 = (input: string): number => {
  const moves = parseMoves(input);
  const visitedPositions: string[] = ['0,0'];
  const currentPosition: {
    head: Position;
    tail: Position;
  } = {
    head: {
      x: 0,
      y: 0
    }, 
    tail: {
      x: 0,
      y: 0
    }
  };

  log(moves);

  logMove(currentPosition);
  for (const [direction, amount] of moves) {
    log(`Move ${direction} ${amount} times`);
    for (let i = 0; i < amount; i++) { 
      const delta = getMove(currentPosition, direction);

      currentPosition.head.x += delta.head.x;
      currentPosition.head.y += delta.head.y;
      currentPosition.tail.x += delta.tail.x;
      currentPosition.tail.y += delta.tail.y;

      const maxDelta = getMaxDelta(currentPosition);
      if (maxDelta > 1) {
        console.log(currentPosition);
        console.log('Max delta', maxDelta);
        throw new Error('Invalid position! Tail is detached');
      }


      log('New');
      logMove(currentPosition);
      //log(`--Head: ${currentPosition.head.x}, ${currentPosition.head.y}`);
      //log(`--Tail: ${currentPosition.tail.x}, ${currentPosition.tail.y}`);

      visitedPositions.push(`${currentPosition.tail.x},${currentPosition.tail.y}`);
    }
  }

  return new Set(visitedPositions).size;
};
