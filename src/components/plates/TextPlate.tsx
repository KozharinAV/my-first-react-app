import classes from "./TextPlate.module.scss";

interface PropType {
  text: string;
  visibility: "visible" | "hidden";
}

export default function TextPlate({ text, visibility }: PropType) {
  return (
    <div
      className={classes.plate}
      style={{ visibility: visibility }}
    >
      {text}
    </div>
  );
}
