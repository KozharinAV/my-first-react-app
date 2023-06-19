import classes from "./PointsPlate.module.scss";

interface PropType {
  penaltyLimit: number;
  leftPoints: number;
  rightPoints: number;
}

export default function PointsPlate({ penaltyLimit, leftPoints, rightPoints }: PropType) {
  return (
    <div className={classes.table}>
      <span>ИГРА ДО {penaltyLimit} ОЧКОВ</span>
      <div className={classes.points}>
        <span>{leftPoints}</span>
        <span className={classes.dash}>-</span>
        <span>{rightPoints}</span>
      </div>
    </div>
  );
}
