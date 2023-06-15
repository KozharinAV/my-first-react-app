export enum Turn {
  HUMAN = "human",
  COMPUTER = "computer",
}

export interface Player {
  cards: Array<number>;
  penaltyPoints: number;
  defenceHand: Array<number>;
}
