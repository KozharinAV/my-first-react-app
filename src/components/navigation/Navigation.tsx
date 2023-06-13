import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.scss";

export default function Navigation() {
  return (
    <div className={classes.navigation}>
      <NavLink className={classes.link} to="/">
        Game
      </NavLink>
      <NavLink className={classes.link} to="/rules">
        Rules
      </NavLink>
    </div>
  );
}
