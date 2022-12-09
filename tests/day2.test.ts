import test from 'ava';
import {part1, part2} from '../puzzles/day2/methods';

const input = `A Y
B X
C Z`; 

test('(day2:part1) Returns the correct score for the first strategy', t => {
  const result = part1(input);
  t.is(result, 15);
});

test('(day2:part2) Returns the correct score for the second strategy', t => {
  const result = part2(input);
  t.is(result, 12);
});
