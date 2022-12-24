import fs from 'fs';
import path from 'path';

export const loadInput = (day: number | string, isTest = false): string => {
  const fileName = process.env.IS_TEST || isTest ? `day${day}.test` : `day${day}`; 
  try {
    const data = fs.readFileSync(path.join(__dirname, `../inputs/${fileName}.txt`)).toString();
    const parts = data.split('\n');
    return parts.join('\n');
  } catch (error: unknown) {
    console.warn(`[ERROR]: I can't seem to find the input for day ${day}... perhaps the file doesn't exist at inputs/${fileName}.txt?`);
    console.log();
    throw error;
  }
}
