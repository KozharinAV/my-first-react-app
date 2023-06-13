import Navigation from "../navigation/Navigation";
import classes from "./Header.module.scss";

export default function Header() {
  return (
    <header className={classes.header}>
      <span>Wall to wall game</span>
      <Navigation />
    </header>
  );
}
