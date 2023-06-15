import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import classes from "./Options.module.scss";
import CustomInput from "../custom-input/CustomInput";
import { gameSlice } from "../../store/reducers/GameSlice";

export default function Options() {
  const { penaltyLimit } = useAppSelector((state) => state.gameReducer);
  const { setPenaltyLimit } = gameSlice.actions;
  const dispatch = useAppDispatch();
  const limitChanged = (value: number) => dispatch(setPenaltyLimit(value));

  return (
    <div className={classes.options}>
      <h1>Настройки</h1>
      <h2 className={classes.label}>Количество штрафных очков</h2>
      <CustomInput
        value={penaltyLimit}
        change={limitChanged}
      />
    </div>
  );
}
