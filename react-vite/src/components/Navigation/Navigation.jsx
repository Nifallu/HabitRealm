import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul className="navigationBar">
      <li>
        <h1><NavLink className="HabitRealm" to="/">HabitRealm</NavLink></h1>
      </li>
      <li>
        <NavLink className="navLinks"to="/quests">Quests</NavLink>
      </li>
      <li className="profileButton">
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
