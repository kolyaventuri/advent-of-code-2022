import fs from 'fs';
import path from 'path';

export const loadInput = (day: number): string => {
  const fileName = process.env.IS_TEST ? `day${day}-test` : `day${day}`; 
  try {
    return fs.readFileSync(path.join(__dirname, `../inputs/${fileName}.txt`)).toString();
  } catch (error: unknown) {
    console.warn(`[ERROR]: I can't seem to find the input for day ${day}... perhaps the file doesn't exist at inputs/${fileName}.txt?`);
    console.log();
    throw error;
  }
}
