import test from 'ava';
import {part1, part2} from '../puzzles/day3';

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

test('(day3:part1) Returns the correct sum of item priorities for the rucksack', t => {
  const result = part1(input);
  t.is(result, 157);
});

test('(day3:part2) Returns the correct priorities for grouped rucksacks', t => {
  const result = part2(input);
  t.is(result, 70);
});

