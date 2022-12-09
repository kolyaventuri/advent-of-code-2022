import test from 'ava';
import {part1, part2} from '../puzzles/day4';

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

test('(day4:part1) Returns the correct number of pairs that fully contain another', t => {
  const result = part1(input);
  t.is(result, 2);
});

test('(day4:part2) Returns the correct number of pairs that overlap', t => {
  const result = part2(input);
  t.is(result, 4);
});


