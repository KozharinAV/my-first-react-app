import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import classes from "./Options.module.scss"
import CustomInput from "../../components/custom-input/CustomInput"
import CustomButton from "../../components/buttons/CustomButton"
import ModalWindow from "../../components/modal-window/ModalWindow"
import { gameSlice } from "../../store/reducers/GameSlice"
import Togle from "../../components/buttons/Toggle"
import { ReactNode, useState } from "react"
import { gifApi } from "../../services/gifService"

export default function Options() {
  const { penaltyLimit, hints } = useAppSelector((state) => state.gameReducer)
  const { setPenaltyLimit, setHints } = gameSlice.actions
  const dispatch = useAppDispatch()
  const limitChanged = (value: number) => dispatch(setPenaltyLimit(value))
  const hintsChanged = () => dispatch(setHints())

  //Random gif
  const { data } = gifApi.useFetchRandonGifQuery("")
  const [randomGifOpen, setRandomGifOpen] = useState(false)
  const showRandomGif = () => {
    setRandomGifOpen(true)
  }
  const gif: ReactNode = (
    <img
      className={classes.gif}
      src={data?.data.images.original.url}
      alt="gif"
      onClick={() => setRandomGifOpen(false)}
    />
  )

  return (
    <div className={classes.options}>
      <h1>Настройки</h1>
      <h2>Количество штрафных очков</h2>
      <CustomInput value={penaltyLimit} change={limitChanged} />
      <h2>Подсказки в игре</h2>
      <Togle checked={hints} change={hintsChanged} />
      <h2>
        <CustomButton text="Случайная гифка" onClick={() => showRandomGif()} />
      </h2>
      <ModalWindow children={gif} visible={randomGifOpen} />
    </div>
  )
}
