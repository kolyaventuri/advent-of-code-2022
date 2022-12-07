import test from 'ava';
import {part1, part2} from '../puzzles/day6/methods';

const inputs: [string, number][] = [
  ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 7],
  ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5],
  ['nppdvjthqldpwncqszvftbrmjlhg', 6],
  ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10],
  ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11]
];

for (const input of inputs) {
  const [data, expected] = input;
  test(`(part1): returns ${expected} for ${data}`, t => {
    const result = part1(data);
    t.is(result, expected);
  });
}

const part2Inputs: [string, number][] = [
  ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 19],
  ['bvwbjplbgvbhsrlpgdmjqwftvncz', 23],
  ['nppdvjthqldpwncqszvftbrmjlhg', 23],
  ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 29],
  ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 26]
]

for (const input of part2Inputs) {
  const [data, expected] = input;
  test(`(part2): returns ${expected} for ${data}`, t => {
    const result = part2(data);
    t.is(result, expected);
  });
}
