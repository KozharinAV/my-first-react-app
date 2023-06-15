export enum Turn {
  HUMAN = "human",
  COMPUTER = "computer",
}

export interface Player {
  cards: Array<number>;
  penaltyPoints: number;
  defenceHand: Array<number>;
}

export enum Images {
  CARD = "public/images/card.jpg",
  CARD_ZERO = "public/images/image0.png",
  CARD_ONE = "public/images/image1.png",
  CARD_TWO = "public/images/image2.png",
  CARD_THREE = "public/images/image3.png",
  CARD_FOUR = "public/images/image4.png",
}
