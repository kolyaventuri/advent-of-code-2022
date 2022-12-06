import fs from 'fs';
import path from 'path';

export const loadInput = (day: number): string => {
  try {
    return fs.readFileSync(path.join(__dirname, `../inputs/day${day}.txt`)).toString();
  } catch (error: unknown) {
    console.warn(`[ERROR]: I can't seem to find the input for day ${day}... perhaps the file doesn't exist at inputs/day${day}.txt?`);
    console.log();
    throw error;
  }
}
