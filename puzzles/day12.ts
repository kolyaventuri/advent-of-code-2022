import { log } from "../utils/logger";

type GraphNode = [number, number];
type GraphResult = {
  graph: Graph<number>;
  start: number;
  end: number;
}

export const getSurroundingTiles = (map: number[][], x: number, y: number): [number, number][] => {
  const nodes: ([number, number] | null)[] = [
    map[y][x - 1] ? [x -  1, y] : null, // Left
    map[y][x + 1] ? [x + 1, y] : null, // Right
    map[y - 1]?.[x] ? [x, y - 1] : null, // Up
    map[y + 1]?.[x] ? [x, y + 1] : null // Down
  ];

  const filteredOnce = nodes.filter(node => !!node) as [number, number][]; 
  const currentNode = map[y][x];
  const twice = filteredOnce.filter(([x1, y1]) => {
    const node = map[y1][x1];

    if (node > currentNode + 1) return false;
    return true;
  });

  return twice;
}

const ABORT_STEPS = 1e7;
const formatter = new Intl.NumberFormat('en-US');
const abortStepsString = formatter.format(ABORT_STEPS);

class Graph<T extends number> {
  verticies: Set<T>;
  adjacent: Record<T, T[]>;
  edges: number;

  constructor() {
    this.verticies = new Set();
    this.adjacent = {} as typeof this.adjacent;
    this.edges = 0;
  }

  addVertex(vertex: T) {
    this.verticies.add(vertex);
    this.adjacent[vertex] = [];
  }

  addEdge(vertex: T, vertex2: T) {
    this.adjacent[vertex].push(vertex2);
    this.edges++;
  }

  bfs(start: T, end: T): number {
    let adjacent = this.adjacent;
    log(this.verticies, this.adjacent)

    const queue = new Queue<T>();
    queue.enqueue(start);

    const discovered: boolean[] = [];
    discovered[start] = true;

    const edges: number[] = [];
    edges[start] = 0;

    let steps = 0;
    while (!queue.isEmpty()) {
      steps++;
      if (steps === ABORT_STEPS) {
        throw new Error(`Max steps reached! Aborting after ${abortStepsString} steps...`);
      }

      let vertex = queue.dequeue() as T;
      log('Looking at ', vertex);

      if (vertex === end) {
        return edges[end];
      }

      for (let i = 0; i < adjacent[vertex].length; i++) {
        if (!discovered[adjacent[vertex][i]]) {
          discovered[adjacent[vertex][i]] = true;
          queue.enqueue(adjacent[vertex][i]);
          edges[vertex] ||= 0;
          edges[adjacent[vertex][i]] = edges[vertex] + 1;
        }
      }
    }

    return -1;
  }
}

export const parseHeightMap = (input: string): GraphResult => {
  const lines = input.split('\n').map(n => n.trim()).filter(n => !!n);
  
  const simpleGraph: GraphNode[] = [];
  const map: number[][] = [];
  let start = 0;
  let end = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const tile = lines[i][j];
      let value = tile.charCodeAt(0) - 96;
      
      if (tile === 'S') {
        value = 1;
        start = (line.length * i) + j;
      } else if (tile === 'E') {
        value = 26;
        end = (line.length * i) + j;
      }

      map[i] ||= [];
      map[i].push(value);
    }
  }

  const maxNode = map.length * map[0].length;
  const len = map[0].length;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const validSurrounding = getSurroundingTiles(map, x, y);
      for (const tile of validSurrounding) {
        const [x2, y2] = tile;

        const nodeNum = (y2 * len) + x2;
        const currentNodeNum = (y * len) + x;
        const node: GraphNode = [currentNodeNum, nodeNum];

        if (x === 0 && y === 0) {
          log(y2, x2)
          log(nodeNum, currentNodeNum)
        }

        if (nodeNum > maxNode) {
          throw new Error(`Invalid node number ${nodeNum}, x: ${x2}, y: ${y2}, ${tile} ${map.length}`);
        }
        if (currentNodeNum > maxNode) {
          throw new Error(`Invalid current node number ${currentNodeNum}, x: ${x}, y: ${y}`);
        }

        simpleGraph.push(node);
      }
    }
  }

  const graph = new Graph<number>();
  for (const [a, b] of simpleGraph) {
    graph.addVertex(a);
    graph.addVertex(b);
  }

  for (const [a, b] of simpleGraph) {
    graph.addEdge(a, b);
  }

  return {
    graph,
    start,
    end
  };
}

class Queue<T> extends Array<T> {
  constructor(...args: T[]) {
    super(...args);
  }

  enqueue(...args: Parameters<Array<T>['push']>): ReturnType<Array<T>['push']> {
    return this.push(...args);
  }

  dequeue(...args: Parameters<Array<T>['shift']>): ReturnType<Array<T>['shift']> {
    return this.shift(...args);
  }

  isEmpty() {
    return this.length === 0;
  }
}

export const part1 = (input: string): number => {
  const {graph, start, end} = parseHeightMap(input);

  log('Start:', start);
  log('End:', end);

  const result = graph.bfs(start, end);
  return result;
}
