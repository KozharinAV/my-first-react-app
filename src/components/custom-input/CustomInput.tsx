import classes from "./CustomInput.module.scss";

interface PropType {
  value: number;
  change(value: number): void;
}

export default function CustomInput({ value, change }: PropType) {
  const validateCount = (newValue: number) => {
    if (newValue > 0 && newValue <= 20) change(newValue);
  };

  return (
    <div className={classes.wrapper}>
      <button
        className={classes.button}
        onClick={() => validateCount(value - 1)}
      >
        -
      </button>
      <span className={classes.input}>{value}</span>
      <button
        className={classes.button}
        onClick={() => validateCount(value + 1)}
      >
        +
      </button>
    </div>
  );
}
