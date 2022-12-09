import test from 'ava';
import {part1, part2} from '../puzzles/day1/methods';

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

test('(day1:part1) Returns the count of calories carried by the elf carrying the most', t => {
  t.is(part1(input), 24000);
});

test('(day1:part2) Returns the total of the top 3 elves', t => {
  t.is(part2(input), 45000);
});
