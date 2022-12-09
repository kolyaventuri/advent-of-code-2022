const findDistinct = (input: string, count: number): number => {
  const chars = input.split('');

  for (let i = 0; i < chars.length - count; i++) {
    const part = chars.slice(i, i + count);
    const data = new Set(part);

    if (data.size === count) return i + count;
  }

  return 0;
}

export const part1 = (input: string): number => {
  return findDistinct(input, 4);
};

export const part2 = (input: string): number => {
  return findDistinct(input, 14);
}
