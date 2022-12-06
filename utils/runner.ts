const num = process.argv[2] ?? null;

if (num === null) {
  throw new Error('No puzzle provided');
}

try {
  console.log(`===========\n[PUZZLE ${num}]\n===========\n\n`);
  require(`../puzzles/day${num}`);
} catch (error: unknown) {
  throw error;
}
