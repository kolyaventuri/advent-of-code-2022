import { loadInput } from "../utils/load-input";

const input = loadInput(3);

const sacks = input.split('\n').filter(n => !!n);

const getPriority = (item: string) => {
  const i = item.charCodeAt(0) - 96;

  if (i < 0) return i + 58;
  return i;
};

// Part 1
let sum = 0;
for (const sack of sacks) {
  const compartment1 = sack.substr(0, sack.length / 2);
  const compartment2 = sack.substr(sack.length / 2, sack.length);

  const sharedSet = new Set<string>();
  for (const item of compartment1) {
    if (compartment2.includes(item)) {
      sharedSet.add(item);
    }
  }

  const shared = Array.from(sharedSet);
  const priorites = shared.map(item => getPriority(item));

  sum += priorites.reduce((s = 0, i) => s += i);
} 

console.log('Part 1:', sum);

// Part 2
sum = 0;
let groups: Array<string[]>= [];
let _group: string[] = []

for (let i = 0; i <= sacks.length; i++) {
  if (i % 3 === 0) {
    groups.push(_group);
    _group = [];
  }
  
  _group.push(sacks[i]);
}

groups = groups.filter(n => n.length > 0);

for (const group of groups) {
  const [sack1, sack2, sack3] = group;
  let commonItem: string = '';
  for (const item of sack1) {
    if (sack2.includes(item) && sack3.includes(item)) {
      commonItem = item;
      break;
    }
  }

  const priority = getPriority(commonItem);
  sum += priority;
}

console.log('Part 2:', sum);
