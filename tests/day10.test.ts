import fs from 'fs';
import path from 'path';
import test from 'ava';
import {part1, part2} from '../puzzles/day10';

const testData = fs.readFileSync(path.join(__dirname, '../inputs/day10.test.txt')).toString();

test('(day10:part1) Returns the total sum', t => {
  const result = part1(testData);

  t.is(result, 13140);
});

test('(day10:part2) Draws the image', t => {
  const result = part2(testData);

  const expected =
`
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`;

  t.is(result, expected);
});
