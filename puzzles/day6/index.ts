import { loadInput } from "../../utils/load-input";
import {part1, part2} from './methods';

const input = loadInput(6);
const string = input.trim();

const result = part1(string);
console.log('Part 1:', result);

const result2 = part2(string);
console.log('Part 2:', result2);
