const num = process.argv[2] ?? null;
const isTest = process.argv[3] === 'test';
if (isTest) {
  process.env.IS_TEST = 'true';
}

if (num === null) {
  throw new Error('No puzzle provided');
}

try {
  console.log(`===========\n[PUZZLE ${num}]\n===========\n\n`);
  require(`../puzzles/day${num}`);
} catch (error: unknown) {
  throw error;
}
