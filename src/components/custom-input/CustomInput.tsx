import { useEffect, useState } from "react";
import classes from "./CustomInput.module.scss";

interface PropType {
  value: number;
  change(value: number): void;
}

export default function CustomInput({ value, change }: PropType) {
  let [count, setCount] = useState(value);

  useEffect(() => {
    change(count);
  }, [count]);

  const validateCount = (value: number) => {
    setCount(value);
    if (value < 1) setCount(1);
    if (value > 20) setCount(20);
  };

  return (
    <div className={classes.wrapper}>
      <button
        className={classes.button}
        onClick={() => validateCount(count - 1)}
      >
        -
      </button>
      <span className={classes.input}>{count}</span>
      <button
        className={classes.button}
        onClick={() => validateCount(count + 1)}
      >
        +
      </button>
    </div>
  );
}
