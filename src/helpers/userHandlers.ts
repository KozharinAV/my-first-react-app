import { Player } from "../models/player-models"

const shuffle = (array: Array<number>): Array<number> => {
  const shuffledArray = [...array]
  let currentIndex = shuffledArray.length,
    randomIndex

  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    ;[shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ]
  }
  return shuffledArray
}

export const getInitialPlayer = (): Player => {
  const cards = []
  for (let i = 0; i <= 4; i++) {
    for (let j = 0; j < 4; j++) {
      cards.push(i)
    }
  }
  const shuffledCards = shuffle(cards)
  return {
    cards: shuffledCards,
    penaltyPoints: 0,
    defenceHand: new Array<number>(3).fill(-1),
  }
}

export const turnStep = (callback: Function) => setTimeout(callback, 1000)
