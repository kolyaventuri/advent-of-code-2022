import test from 'ava';
import {part1, part2} from '../puzzles/day7';

// Adjusted input to account for some edge cases
const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k 
dir a
$ cd a
$ ls
14848514 b.txt
`;

const input2 = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

test('(day7) (part1): Input returns the correct directory size', t => {
  const result = part1(input);

  t.is(result, 95437);
});

test('(day7) (part2): Input returns the correct directory and value to delete', t => {
  const result = part2(input2);

  t.is(result, 24933642);
});
