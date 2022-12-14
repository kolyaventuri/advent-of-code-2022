enum Play {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS"
}

enum Outcome {
  WIN = "WIN",
  DRAW = "DRAW",
  LOSS = "LOSS"
}

const scores = {
  [Outcome.WIN]: 6,
  [Outcome.DRAW]: 3,
  [Outcome.LOSS]: 0,

  [Play.ROCK]: 1,
  [Play.PAPER]: 2,
  [Play.SCISSORS]: 3,
};

const determineOutcome = (them: Play, me: Play): Outcome =>{
  if (me == them) return Outcome.DRAW;

  if (them == Play.ROCK && me == Play.PAPER) return Outcome.WIN;
  if (them == Play.PAPER && me == Play.SCISSORS) return Outcome.WIN;
  if (them == Play.SCISSORS && me == Play.ROCK) return Outcome.WIN;

  return Outcome.LOSS;
};

// Part 1

const mapping1 = {
  A: Play.ROCK,
  B: Play.PAPER,
  C: Play.SCISSORS,

  X: Play.ROCK,
  Y: Play.PAPER,
  Z: Play.SCISSORS
};

export const part1 = (input: string) => {
  const rounds = input.split('\n').filter(n => !!n).map(round => 
    round.split(' ')
  );

  let score = 0;
  for (const round of rounds) {
    const [them, me] = round.map(x => mapping1[x as keyof typeof mapping1]) as [Play, Play];

    const outcome = determineOutcome(them, me);
    score += scores[me];
    score += scores[outcome];
  }
  return score;
};

// Part 2
const mapping2 = {
  A: Play.ROCK,
  B: Play.PAPER,
  C: Play.SCISSORS,

  X: Outcome.LOSS,
  Y: Outcome.DRAW,
  Z: Outcome.WIN
};

const getPlay = (them: Play, desired: Outcome): Play => {
  if (desired === Outcome.DRAW) return them;

  if (desired === Outcome.WIN) {
    switch(them) {
      case Play.ROCK:
        return Play.PAPER;
      case Play.PAPER:
        return Play.SCISSORS;
      case Play.SCISSORS:
        return Play.ROCK;
    }
  }

  // else Outcome.LOSE is implied
  switch(them) {
    case Play.ROCK:
      return Play.SCISSORS;
    case Play.PAPER:
      return Play.ROCK;
    case Play.SCISSORS:
      return Play.PAPER;
  }
};

export const part2 = (input: string): number => {
  const rounds = input.split('\n').filter(n => !!n).map(round => 
    round.split(' ')
  );

  let score = 0;
  for (const round of rounds) {
    const [them, desired] = round.map(x => mapping2[x as keyof typeof mapping2]) as [Play, Outcome];

    const me = getPlay(them, desired);
    const outcome = determineOutcome(them, me);
    score += scores[me];
    score += scores[outcome];
  }

  return score;
}

