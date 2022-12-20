import { log } from "../utils/logger";

type Operation = {
  operation: 'add' | 'multiply';
  value: number | 'old';
}

type WorryTest = {
  divisible: number;
  yes: number;
  no: number;
}

type Monkey = {
  starting: number[];
  holding: number[];
  totalHeld: number;
  operation: Operation;
  test: WorryTest;
}

export const parseInstructions = (input: string): Monkey[] => {
  const monkeys: Monkey[] = [];
  const lines = input.split('\n').map(n => n.trim().toLowerCase()).filter(n => !!n); 

  let monkey: Partial<Monkey> = {};
  let i = -1;
  for (const line of lines) {
    if (line.startsWith('monkey'))  {
      log('Creating new monkey')
      monkey = {totalHeld: 0};
      i = -1;
      continue;
    }

    i += 1;

    switch (i) {
      case 0:
        {
          const right = line.split(':')[1].trim();
          const parts = right.split(',').map(n => Number.parseInt(n, 10));
          monkey.starting = monkey.holding = parts;
          log('--Starting with', parts);
          break;
        }
      case 1:
        {
          const right = line.split('=')[1].trim();
          const parts = right.split(/(\*|\+) /);
          const value = Number.parseInt(parts[2], 10);
          monkey.operation = {
            operation: parts[1] === '*' ? 'multiply' : 'add',
            value: parts[2] === 'old' ? 'old' : value 
          };
          log('--Operation', monkey.operation);
          break;
        }
      case 2:
        {
          const right = line.split(':')[1].trim();
          const parts = right.split('by');
          const value = Number.parseInt(parts[1], 10);
          monkey.test ||= {divisible: 0, yes: 0, no: 0};
          monkey.test.divisible = value;
          log('--Test', monkey.test.divisible);
          break;
        }
      case 3:
        {
          const right = line.split(':')[1].trim();
          const parts = right.split('monkey');
          const value = Number.parseInt(parts[1], 10);
          monkey.test ||= {divisible: 0, yes: 0, no: 0};
          monkey.test.yes = value;
          log('----If yes', value);
          break;
        }
      case 4:
        {
          const right = line.split(':')[1].trim();
          const parts = right.split('monkey');
          const value = Number.parseInt(parts[1], 10);
          monkey.test ||= {divisible: 0, yes: 0, no: 0};
          monkey.test.no = value;
          log('----If no', value);
          // Last line, add to array
          log('----Add to array')
          monkeys.push(monkey as Monkey);
          log(monkey);
          break;
        }
    }
  }

  return monkeys;
}

export const part1 = (input: string): number => {
  return 0;
};
