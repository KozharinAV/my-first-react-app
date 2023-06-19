export enum Turn {
  HUMAN = "human",
  COMPUTER = "computer",
  NONE = "none",
}

export interface Player {
  cards: Array<number>;
  penaltyPoints: number;
  defenceHand: Array<number>;
}

export enum Images {
  CARD = "/images/card.avif",
  CARD_ZERO = "/images/image0.png",
  CARD_ONE = "/images/image1.png",
  CARD_TWO = "/images/image2.png",
  CARD_THREE = "/images/image3.png",
  CARD_FOUR = "/images/image4.png",
}
