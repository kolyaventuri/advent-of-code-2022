const IS_DEBUG = !!process.env.IS_DEBUG;

export const log = (...args: Parameters<typeof console.log>): ReturnType<typeof console.log> => {
  if (IS_DEBUG) {
    return console.log(...args);
  }
}
