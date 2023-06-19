import classes from "./CustomButton.module.scss";

interface PropType {
  text: string;
  onClick(): void;
}
export default function CustomButton({ text, onClick }: PropType) {
  return (
    <div
      className={classes.button}
      onClick={() => onClick()}
    >
      {text}
    </div>
  );
}
