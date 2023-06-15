import Card from "../../components/cards/Card";
import PointsTable from "../../components/points-table/PointsTable";
import classes from "./GameField.module.scss";

export default function GameField() {
  return (
    <div className={classes.wrapper}>
      <PointsTable />
      <Card />
    </div>
  );
}
