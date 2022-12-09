export const getTotals = (input: string): number[] => {
  const elves = input.split('\n\n');
  let totals: number[] = [];

  for (const elf of elves) {
    const counts = elf.split('\n').map(n => Number.parseInt(n, 10));
    const sum = counts.reduce((s = 0, i) => s += i);

    totals.push(sum);
  }

  totals = totals.sort((a, b) => b - a);

  return totals;
}

export const part1 = (input: string) => {
  const totals = getTotals(input);
  return totals[0];
}

export const part2 = (input: string) => {
  const totals = getTotals(input);
  const [one,two,three] = totals;

  return one + two + three;
}
