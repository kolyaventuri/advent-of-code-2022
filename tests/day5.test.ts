import test from 'ava';
import {part1, part2} from '../puzzles/day5';

const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

test('(day5:part1) Returns the correct order of the topmost for each stack', t => {
  const result = part1(input);
  t.is(result, 'CMZ');
});

test('(day5:part2) Returns the correct order of the topmost for each stack', t => {
  const result = part2(input);
  t.is(result, 'MCD');
});



