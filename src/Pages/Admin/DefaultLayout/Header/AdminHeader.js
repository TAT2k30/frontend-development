import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../../Assets/Data/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../../Assets/Image/Logo/logo-png.png"
import "./AdminHeader.scss";

function AdminHeader() {
  const { token, logout } = useContext(DataContext);

  return (
    <div className="admin-header-container">
      <div className="left-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
      </div>
      <div className="logo-center">
        <img src={Logo} width={70} />
      </div>
      <div className="right-info">
        {token ? (
          <div className="dropdown-container">
            <img
              src={token.AvatarUrl}
              className="imgAvatar"
              alt="User Avatar"
              style={{ maxWidth: "37px", maxHeight: "37px" }}
            />
            
            <FontAwesomeIcon
              size="lg"
              icon={faSignInAlt}
              width={30}
              onClick={()=>{logout(token.Email)}}
            />
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

export default AdminHeader;
