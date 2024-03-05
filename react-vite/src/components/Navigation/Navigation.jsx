import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <ul className="navigationBar">
      <li>
        <h1><NavLink className="HabitRealm" to="/">HabitRealm</NavLink></h1>
      </li>
      <li>
        <NavLink className="navLinks" to="https://www.github.com/Nifallu">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub"
            style={{ height: "30px" }}
          />
        </NavLink>
      </li>
      <li>
      {sessionUser ? <NavLink className="navLinks" to="/">Habits</NavLink>: null}
      </li>
      <li>
        <NavLink className="navLinks"to="/quests">Quests</NavLink>
      </li>
      <li>
        <NavLink className="navLinks" to="/rewards/Shop">Rewards Shop</NavLink>
      </li>
      <li className="profileButton">
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
