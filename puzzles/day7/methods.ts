import { log } from "../../utils/logger";

type Directory = {type: 'dir'; name: string; children: Node[]; parent?: Node;};
type File = {type: 'file'; size: number; name: string; parent?: Node;}
type Node = Directory | File; 

type CommandType = 'ls' | 'cd';

type Command = {type: 'command', name: CommandType, args: string[], value: string};
type Output = {type: 'output', value: string};
type Line = Command | Output;

const parseInput = (input: string): Line[] => {
  const _lines = input.split('\n')
  const lines: Line[] = [];
  for (const line of _lines) {
    let tmp: Line;
    if (line[0] === '$') {
      const parts = line.split(' ');
      const [_, name, ...args] = parts;
      tmp = {type: 'command', name: name as CommandType, args: args ?? [], value: [name, ...args].join(' ')};
    } else {
      tmp = {type: 'output', value: line};
    }

    lines.push(tmp);
  }

  return lines;
}

const MAX_SIZE = 100_000;

/* 
- / (dir)
  - a (dir)
    - e (dir)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
  - b.txt (file, size=14848514)
  - c.dat (file, size=8504156)
  - d (dir)
    - j (file, size=4060174)
    - d.log (file, size=8033020)
    - d.ext (file, size=5626152)
    - k (file, size=7214296)
    */

const logItem = (node: Node, depth: number): void => {
  const padding = new Array(depth * 2).fill(' ').join('');

  const extra = node.type === 'dir' ? '(dir)' : `(file, size=${node.size})`;
  log(`${padding}- ${node.name} ${extra}`);
};

const recursiveLogTree = (node: Node, depth = 0): void => {
  logItem(node, depth);

  if (node.type === 'dir') {
    if (node.children.length > 0) {
      for (const child of node.children) {
        recursiveLogTree(child, depth + 1);
      }
    }
  }
}

const logTree = (tree: Node): void => {
  let currentNode = tree;
  while (currentNode.parent) {
    currentNode = currentNode.parent;
  }

  recursiveLogTree(currentNode);
}

export const part1 = (input: string): number => {
  const lines = parseInput(input);
  let result = 0;

  log(lines);

  let tree: Node | null; 

  let currentNode: Node | null = null; 
  for (const line of lines) {
    if (line.type === "command" && line.name === "cd") {
      const newNode: Directory = {type: 'dir', name: line.args[0], children: []};
      if (line.args[0] === "/") {
        tree = newNode; 
        currentNode = tree;
      } else if (line.args[0] === "..") {
        if (!currentNode?.parent) {
          throw new Error('Cannot traverse upwards');
        }
        currentNode = (currentNode as Directory).parent as Directory;
      } else {
        newNode.parent = currentNode as Directory;
        (currentNode as Directory).children.push(newNode);
        currentNode = newNode;
      }
    } else if (line.type === "output") {
      const parts = line.value.split(' ');
      const [data, name] = parts;
      if (data === 'dir') continue;
      const size = Number.parseInt(data, 10);

      const newNode: File = {type: 'file', name, size};
      currentNode?.children.push(newNode);
    }
  }

  if (currentNode) logTree(currentNode);

  return result;
}
