import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { useNavigate } from "react-router-dom";

import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";


function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate('/')
  };

  return (
    <>
      {user ? (
        <>
          <button className="menuButton" onClick={toggleMenu}>
            {/* <i className="fas fa-user-circle" /> */}
            <img src="https://i.ibb.co/FVL2wrL/MyAvatar.png" alt="MyAvatar" border="0" width="200px"/>
          </button>
          {showMenu && (
            <ul className={"profile-dropdown"} ref={ulRef}>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button className='AvatarButton'>Avatar</button>
              </li>
              <li>
                <button className="buttons" onClick={logout}>Log Out</button>
              </li>
            </ul>
          )}
        </>
      ) : (
        <OpenModalMenuItem
          itemText="Log In"
          onItemClick={closeMenu}
          modalComponent={<LoginFormModal />}
        />
      )}
    </>
  );
}

export default ProfileButton;
