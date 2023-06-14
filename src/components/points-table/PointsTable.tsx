import { useAppSelector } from "../../hooks/redux";
import classes from "./PointsTable.module.scss";

export default function PointsTable() {
  const { penaltyLimit } = useAppSelector((state) => state.gameReducer);

  return (
    <div className={classes.table}>
      <span>ИГРА ДО {penaltyLimit} ОЧКОВ</span>
    </div>
  );
}
