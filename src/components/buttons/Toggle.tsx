import classes from "./Toggle.module.scss";

interface PropType {
  checked: boolean;
  change(): void;
}
export default function Togle({ checked, change }: PropType) {
  const innerClass = checked
    ? `${classes.inner} ${classes.toggled}`
    : `${classes.inner}`;

  const toggleText = checked ? "Вкл" : "Выкл";
  return (
    <div className={classes.wrapper} onClick={change}>
      <div className={innerClass}>{toggleText}</div>
    </div>
  );
}
