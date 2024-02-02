import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../../Assets/Data/DataContext";
import "./Header.scss";


function HeaderAdmin() {
  const { token, logout } = useContext(DataContext);
  return (
    <div className="header-container">
      <div className="left-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
      </div>
      <div className="right-info">
        {token ? (
          <div>
            <span>Welcome, {token.UserName}</span>
            <img
              src={token.AvatarUrl}
              width={50}
              className="imgAvatar"
              alt="User Avatar"
            />

            <button
              onClick={() => {
                logout(token.Email);
              }}
              className="btn btn-warning"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="right-links">
            <div className="btn">
              <Link to="/login">Log in</Link>
            </div>
            <div className="btn">
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderAdmin;