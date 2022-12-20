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
  holding: number[];
  timesInspected: number;
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
      monkey = {timesInspected: 0};
      i = -1;
      continue;
    }

    i += 1;

    switch (i) {
      case 0:
        {
          const right = line.split(':')[1].trim();
          const parts = right.split(',').map(n => Number.parseInt(n, 10));
          monkey.holding = parts;
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

export const doRound = (monkeys: Monkey[]): Monkey[] => {
  for (let i = 0; i < monkeys.length; i++) {
    let monkey = monkeys[i];
    log(`Monkey ${i}, holding ${monkey.holding}`);

    for (let j = 0; j < monkey.holding.length; j++) {
      monkeys[i].timesInspected += 1;
      let item = monkey.holding[j];
      log(`  Holding item with worry ${item}`);

      const {operation, value} = monkey.operation;
      if (operation === 'add') {
        item += value === 'old' ? item : value;
      } else if (operation === 'multiply') {
        item *= value === 'old' ? item : value;
      }

      log(`    ${operation} ${value} to item, new worry ${item}`);
      item = ~~(item / 3);
      log(`    Monkey is bored, divide by 3, new worry ${item}`);

      const testPassed = item % monkey.test.divisible === 0;
      let toPass = monkey.test.yes;
      if (testPassed) {
        log(`    Was divisible by ${monkey.test.divisible}, passing to monkey ${monkey.test.yes}`)
      } else {
        log(`    Was not divisible by ${monkey.test.divisible}, passing to monkey ${monkey.test.no}`)
        toPass = monkey.test.no;
      }

      monkeys[toPass].holding.push(item);
      monkeys[i].holding[j] = -1; // Mark as no longer holding
    }

    monkeys[i].holding = monkeys[i].holding.filter(n => n !== -1);
  }

  return monkeys;
}

export const part1 = (input: string): number => {
  let monkeys = parseInstructions(input);

  for (let i = 0; i < 20; i++) {
    monkeys = doRound(monkeys);
  }

  log(monkeys)
  const ranked = monkeys.sort((a, b) => b.timesInspected - a.timesInspected); 
  const [one, two] = ranked;
  log(`Top two monkeys inspected things ${one.timesInspected} and ${two.timesInspected} times`);

  return one.timesInspected * two.timesInspected;
};
