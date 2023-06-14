import classes from "./Rules.module.scss";
import { rules } from "../../common/text/rules";

export default function Rules() {
  return (
    <div className={classes.wrapper}>
      {rules.split("\n").map((item: string, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}
