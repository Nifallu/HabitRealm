import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        {/* <ProfileButton /> */}
        <button>Log In</button>
      </li>
    </ul>
  );
}

export default Navigation;
