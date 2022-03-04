import React, { useContext } from "react";
import AppContext from "./AppContext";
import "../css/Header.css";
import { Link } from "react-router-dom";
function Header() {
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;
  const signOut = () => {
    localStorage.removeItem("token");
    dispatch({ type: "CURRENT_USER", payload: null });
  };
  return (
    <div className="header">
      <h1 className="logo">
        <Link to="/">Diary</Link>
      </h1>
      <nav>
        <ul className="main-nav">
          {user ? (
            <>
              <li>
                <span className="user-name">Hello, {user.userName}</span>
              </li>
              <li>
                <a onClick={() => signOut()}>Sign out</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
