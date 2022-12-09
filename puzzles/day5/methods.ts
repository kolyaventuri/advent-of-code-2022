import {log} from '../../utils/logger';

type Instruction = {amount: number, from: number, to: number};

const parseInstruction = (index: number, instruction: string, line: number): Instruction => {
  const matches = instruction.match(/\d+/g);
  if (!matches) throw new Error(`Malformed instruction "${instruction}"`);

  const amount = Number.parseInt(matches[0], 10);
  const from = Number.parseInt(matches[1], 10) - 1;
  const to = Number.parseInt(matches[2], 10) - 1;

  if (amount < 0) {
    console.log(matches);
    throw new Error(`Invalid instruction on line ${line + 2 + index}: "${instruction}". Got amount=${amount}`)
  }
  if (from < 0) {
    console.log(matches);
    throw new Error(`Invalid instruction on line ${line + 2 + index}: "${instruction}". Got from=${from}`)
  }
  if (to < 0) {
    console.log(matches);
    throw new Error(`Invalid instruction on line ${line + 2 + index}: "${instruction}". Got to=${to}`)
  }

  
  return {amount, from, to};
};


type Stacks = string[][];
const parseInput = (input: string): {stacks: Stacks, instructions: Instruction[]} => {
  const lines = input.split('\n').filter(n => !!n);

  let index = 0; // Instructions start on this line
  // Load in the stacks
  const splitLines = lines.map(line =>
    line.trimEnd()
      .replace(/\s{3}/g, '[]')
      .replace(/\s/g, '')
      .replace(/\[\]/g, '?')
      .replace(/\[|\]/g, '')
  );

  const originalStacks: Stacks = [];
  for (const line of splitLines) {
    if (line[0] === '1') {
      index += 1;
      break;
    }

    for (let i = 0; i < line.length; i++) {
      const item = line[i];
      if (!item) continue;

      if (!originalStacks[i]) originalStacks[i] = [];
      if (item === '?') continue;
      originalStacks[i].unshift(item);
    }
    index += 1;
  }

  const instructionStrings: string[] = [];
  for (let i = index; i < lines.length; i++) {
    instructionStrings.push(lines[i]);
  }

  const instructions = instructionStrings.map((s, i) => parseInstruction(index, s, i));
  return {stacks: originalStacks, instructions}; 
};


// Debug
const logStack = (stacks: Stacks) => {
  const tallestStack = Math.max(...stacks.map(n => n.length));
  let rotated: string[][] = [];

  const cloneStacks = JSON.parse(JSON.stringify(stacks));
  for (let i = 0; i < tallestStack; i++) {
    let newRow: string[] = [];
    for (let i = 0; i < cloneStacks.length; i++) {
      const item = cloneStacks[i].shift();
      newRow.push(item ?? '');
    }

    rotated.unshift(newRow);
  }

  for (const row of rotated) {
    const output: string[] = [];
    for (const item of row) {
      if (item) {
        output.push(`[${item}]`);
      } else {
        output.push('   ');
      }
    }

    log('===========');
    log(output.join(''));
    log('===========');
  }
}

const getTopMost = (stacks: Stacks) => {
  const topMost = stacks.map(stack => stack[stack.length - 1]).filter(item => !!item);
 return topMost.reduce((s = '', n) => s += n);
}

export const part1 = (input: string) => {
  const {stacks: inStacks, instructions} = parseInput(input);
  const stacks: Stacks = JSON.parse(JSON.stringify(inStacks));

  const makeMove = ({from, to}: Omit<Instruction, 'amount'>) => {
    const item = stacks[from].pop() as string;

    stacks[to].push(item);

    stacks[from] = stacks[from].filter(n => !!(n ?? '').trim());
    stacks[to] = stacks[to].filter(n => !!(n ?? '').trim());
  };

  const execute = ({amount, from, to}: Instruction) => {
    for (let i = 0; i < amount; i++) {
      makeMove({from, to});
    }
  };

  const executeLoop = () => {
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];
      log(instruction)
      const {amount, from, to} = instruction;
      log(`Instruction ${i + 1}: move ${amount} from ${from + 1} to ${to + 1}`);
      execute(instruction);
      logStack(stacks);
    }
  }

  logStack(stacks);
  executeLoop();

  return getTopMost(stacks);
};


// Part 2
export const part2: typeof part1 = (input: string): string => {
  const {stacks: inStacks, instructions} = parseInput(input);

  const stacks: Stacks = JSON.parse(JSON.stringify(inStacks));

  const execute = ({amount, from, to}: Instruction) => {
    const buffer: string[] = [];
    for (let i = 0; i < amount; i++) {
      const item = stacks[from].pop() as string;

      buffer.unshift(item);
    }

    stacks[to].push(...buffer);
  };

  const executeLoop = () => {
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];
      log(instruction)
      const {amount, from, to} = instruction;
      log(`Instruction ${i + 1}: move ${amount} from ${from + 1} to ${to + 1}`);
      execute(instruction);
      logStack(stacks);
    }
  }

  logStack(stacks);
  executeLoop();
  return getTopMost(stacks); 
};
