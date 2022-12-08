import test from 'ava';
import {part1} from '../puzzles/day8/methods';

const input =
`30373
25512
65332
33549
35390`;
test('(day8:part1) Returns the correct number of visible trees', t => {
  const result = part1(input);
  t.is(result, 21);
});
