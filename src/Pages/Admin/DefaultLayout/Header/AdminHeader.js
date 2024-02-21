import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../../../Assets/Data/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../../Assets/Image/Logo/logo-png.png";
import "./AdminHeader.scss";
import { UserPath } from "../../../../Routes/routerList";

function AdminHeader({ toggleSidebar }) {
  const { token, logout } = useContext(DataContext);
  const navigate = useNavigate();


  return (
    <div className="admin-header-container">
      <div className="admin-left-links">
        <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} className="toggle-button" />
      </div>
      <div className="logo-center" onClick={()=>navigate('/')}>
        <img src={Logo} width={70} alt="Logo" />
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
              onClick={() => { logout(token.Email) }}
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
