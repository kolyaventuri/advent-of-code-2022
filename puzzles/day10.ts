import { log } from "../utils/logger";

type Instruction = ['noop'] | ['addx', number];

const parseInput = (input: string): Instruction[] => {
  const instructions: Instruction[] = [];

  const lines = input.split('\n').map(n => n.trim()).filter(n => !!n);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [name, arg] = line.split(' ');
    if (name === 'noop') {
      instructions.push(['noop']);
    } else if (name === 'addx') {
      const amount = Number.parseInt(arg, 10);
      if (!Number.isFinite(amount) || Number.isNaN(amount)) {
        throw new Error(`Invalid value for addx on line ${i} -- Got "${arg}"`);
      }

      instructions.push(['addx', amount]);
    } else {
      throw new Error(`Invalid instruction ${line} on line ${i}`);
    }
  }

  log(`Parsed ${instructions.length} instructions`);

  return instructions;
}

export const part1 = (input: string): number => {
  let register = 1;
  const cycles: number[] = []; // Hold the value at each cycle

  const instructions = parseInput(input);

  for (let i = 0; i < instructions.length; i++) {
    const [instruction, arg] = instructions[i];

    cycles.push(register);
    log(`Cycle ${cycles.length} -- ${instructions[i]} -- Register = ${register} -- line ${i + 1}`);
    if (instruction === 'addx') {
      register += arg;
      cycles.push(register);
      log(`Cycle ${cycles.length} -- ${instructions[i]} -- Register = ${register} -- line ${i + 1}`);
    }
  }

  log(cycles);
  const values: number[][] = []; 
  for (let i = 20; i < cycles.length; i += 40) {
    values.push([i, cycles[i - 2], cycles[i - 2] * i]);
  }
  log(values);

  let sum = 0;
  for (const value of values) {
    sum += value[2];
  }

  return sum;
}
