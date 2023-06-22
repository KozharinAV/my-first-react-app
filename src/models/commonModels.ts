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

export enum Messages {
  GAME_TITLE = 'Игра "Cтенка на стенку"',
  START_GAME = "Начать игру",
  HUMAN_WINS = "Вы победили, поздравляю!",
  NEW_GAME = "Начать сначала",
  COMPUTER_WINS = "Вы проиграли, не расстраивайтесь",
  //hints
  COMPUTERS_TURN = "Подождите, пока соперник завершит свой ход",
  MAKE_TURN = "Сделайте ход, кликнув по своей колоде карт",
  CHOOSE_CARD = "Выберите карту из защиты соперника, меньшую по достоинству, чем карта на кону. Учтите, что 0 бьет 4."
}
