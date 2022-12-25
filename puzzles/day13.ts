import { log } from "../utils/logger";

type Packet = number[] | Packet[]; 

export const parseInput = (input: string): [Packet, Packet][] => {
  const packets: [Packet, Packet][] = [];
  const chunks = input.split('\n\n');
  for (const chunk of chunks) {
    const lines = chunk.split('\n').map(n => n.trim()).filter(n => !!n);
    const tmpPackets = lines.map(line => eval(line)) as Packet[];
    const [a, b] = tmpPackets;
    packets.push([a, b]);
  }

  return packets;
}

/* export const validatePair = (pair: [Packet, Packet]): boolean => {
  const [l, r] = pair;
  log('Compare', l, 'vs', r); 

  for (let i = 0; i < (l.length || r.length); i++) {
    const left = l[i];
    const right = r[i];

    const leftIsArray = Array.isArray(left);
    const rightIsArray = Array.isArray(right);

    let result = true;
    if (leftIsArray && !rightIsArray) {
      result = validatePair([left, [right]]);
    } else if (!leftIsArray && rightIsArray) {
      result = validatePair([[left], right]);
    } else if (leftIsArray && rightIsArray) {
      result = validatePair([left, right]);
    }

    if (!result) return false;

    log('--Compare', left, 'vs', right);
    if (!right) {
      log('----Right ran out of elements, inputs in wrong order');
      return false;
    } else if (!left) {
      log('----Left ran out of elements, inputs in correct order');
      return true;
    }
    if (left < right) {
      log('----Left is smaller, inputs in correct order');
      return true;
    } else if (right < left) {
      log('----Right is smaller, inputs NOT in correct order');
      return false;
    }
  }

  if (r.length === 0) {
    log('----Right ran out of elements, inputs in wrong order');
    return false;
  }

  log('----Left ran out of elements, inputs in correct order');
  return true;
}; */

const isNumber = (value: unknown): value is number => Number.isFinite(value);
const isArray = (value: unknown): value is Array<typeof value> => Array.isArray(value);

export const validatePair = (pair: [Packet, Packet], depth = 0): boolean | null => {
  const [a, b] = pair;

  const logPad = (extraPad: number, ...args: Parameters<typeof console.log>) => {
    const padding = new Array((depth + extraPad)).fill(' ').join('');
    log(padding, ...args);
  }

  logPad(0, 'Compare', a, 'to', b);

  const x = Math.max(a.length, b.length);
  for (let i = 0; i < x; i++) {
    const left = a[i];
    const right = b[i];
     if (typeof left === 'undefined' && typeof right !== 'undefined') {
      logPad(2, 'L ran out, CORRECT');
      return true;
    }
    if (typeof right === 'undefined' && typeof left !== 'undefined') {
      logPad(2, 'R ran out, WRONG');
      return false;
    }
    logPad(1, 'Inner compare', left, 'to', right);

    if (isNumber(left) && isNumber(right)) {
      logPad(2, 'Both numbers')
      if (left < right) {
        logPad(2, 'L is less than R, CORRECT');
        return true;
      }

      if (right < left) {
        logPad(2, 'R is less than L, WRONG');
        return false
      }

      if (right === left) {
        continue;
      }
    }

    if (isArray(left) && isArray(right)) {
      const max = Math.max(left.length, right.length);
      for (let j = 0; j < max; j++) {
        const l = left[j];
        const r = right[j]; 

        // @ts-expect-error
        const cmp = validatePair([[l], [r]], depth + 1);
        if (cmp !== null) return cmp;
      }
    } else if (isNumber(left) && isArray(right)) {
      const lX = [left];
      const cmp = validatePair([lX, right], depth + 1);
      if (cmp !== null) return cmp;
    } else if (isNumber(right) && isArray(left)) {
      const rX = [right];
      const cmp = validatePair([left, rX], depth + 1);
      if (cmp !== null) return cmp;
    } 
  }

  return null;
};

export const getPacketValidity = (pairs: [Packet, Packet][]) => {
  const results = pairs.map((pair: any) => [pair, validatePair(pair)]) as [[Packet, Packet], boolean][];
  const index = results.findIndex(pair => pair === null);
  if (index > -1) {
    const pair = pairs[index];
    const out = pair.map(p => JSON.stringify(p)).join('\n');
    throw new Error(`Got a null response on pair ${index}\n\n${out}`);
  }

  return results;
};

export const part1 = (input: string): number => {
  const pairs = parseInput(input);
  const results = getPacketValidity(pairs);
  
  let sum = 0;

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const isValid = result[1];
    if (isValid) {
      sum += i + 1;
    }
  }

  return sum;
};

export const getArrayDepth = (array: Array<unknown>, depth = 0): number => {
  const maxDepth: number[] = [depth];

  for (const item of array) {
    if (isArray(item)) {
      maxDepth.push(getArrayDepth(item, depth + 1));
    } 
  }

  return Math.max(...maxDepth);
};

export const sortPackets = (pairs: [Packet, Packet][]): Packet[] => {
  const flattened = pairs.flat();
  const pairsPlusDiv: Packet[] = [...flattened, [[2]], [[6]]];

  const chunks: Record<string, Packet[]> = {};

  for (const packet of pairsPlusDiv) {
    const flat = packet.flat(15) as number[];
    const id = flat[0] || -1;
    const key = (id + 1).toString();
    
    chunks[key] ||= [];
    chunks[key].push(packet);
  }

  const keys = Object.keys(chunks);
  for (let i = 0; i < keys.length; i++) {
    const id = keys[i];
    chunks[id] = chunks[id].sort((a, b) => {
      return getArrayDepth(a) - getArrayDepth(b);
    });

    chunks[id] = chunks[id].sort((a, b) => {
      const x = a.flat(15).join();
      const y = b.flat(15).join();

      return x > y ? 1 : x == y ? 0 : -1;
    });
  }

  const sorted = Object.values(chunks).flat();

  return sorted;
};

export const part2 = (input: string): number => {
  const pairs = parseInput(input);
  const sorted = sortPackets(pairs);
  const dividerA = '[[2]]';
  const divierB = '[[6]]';
  let decoder = 1;

  for (let i = 0; i < sorted.length; i++) {
    const item = sorted[i];
    const string = JSON.stringify(item);
    log(string);

    if (string === dividerA || string === divierB) {
      decoder *= i + 1;
    }
  }

  return decoder;
};
