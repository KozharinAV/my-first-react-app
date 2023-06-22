import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import classes from "./Options.module.scss";
import CustomInput from "../../components/custom-input/CustomInput";
import { gameSlice } from "../../store/reducers/GameSlice";
import Togle from "../../components/buttons/Toggle";

export default function Options() {
  const { penaltyLimit, hints } = useAppSelector((state) => state.gameReducer);
  const { setPenaltyLimit, setHints } = gameSlice.actions;
  const dispatch = useAppDispatch();
  const limitChanged = (value: number) => dispatch(setPenaltyLimit(value));
  const hintsChanged = () => dispatch(setHints());

  return (
    <div className={classes.options}>
      <h1>Настройки</h1>
      <h2>Количество штрафных очков</h2>
      <CustomInput value={penaltyLimit} change={limitChanged} />
      <h2>Подсказки в игре</h2>
      <Togle checked={hints} change={hintsChanged} />
    </div>
  );
}
