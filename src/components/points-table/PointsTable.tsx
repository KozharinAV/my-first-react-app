import { useAppSelector } from "../../hooks/redux";
import classes from "./PointsTable.module.scss";

export default function PointsTable() {
  const { penaltyLimit } = useAppSelector((state) => state.gameReducer);
  const { human, computer } = useAppSelector((state) => state.usersReducer);

  return (
    <div className={classes.table}>
      <span>ИГРА ДО {penaltyLimit} ОЧКОВ</span>
      <div className={classes.points}>
        <span>{human.penaltyPoints}</span>
        <span className={classes.dash}>-</span>
        <span>{computer.penaltyPoints}</span>
      </div>
    </div>
  );
}
