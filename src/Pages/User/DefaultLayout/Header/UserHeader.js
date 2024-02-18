import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DataContext } from "../../../../Assets/Data/DataContext";
import "./UserHeader.scss";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../SearchBar/UserSearchBar";
import { faSignInAlt, faUserPlus, faBell, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imageLogo from "../../../../Assets/Image/Logo/logo-png.png";
import { UserPath } from "../../../../Routes/routerList";

function UserHeader() {
  const { token, logout } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [routeCheckout, setRouteCheckout] = useState();
  useEffect(() => {
    const checkoutRoute = location.pathname;
    if(location.pathname === UserPath.Upload){
      setRouteCheckout("upload")
    }else if(location.pathname === UserPath.MainLayout){
      setRouteCheckout("main")
    }
  }, [location.pathname])
  return (
    <div className="user-header-container">
      <div className="left-links">
        <Link to={UserPath.MainLayout}>
          <img src={imageLogo} alt="Logo" width={60} style={{ borderRadius: 10 }} />
        </Link>
        <Link to={UserPath.MainLayout} style={routeCheckout === "main" ? {backgroundColor: "#4c4c4c", padding: 10, borderRadius: 20, color : "#EC4D37"} : {}}><b>Home</b></Link>
        <Link to={UserPath.Upload} style={routeCheckout === "upload" ? {backgroundColor: "#4c4c4c", padding: 10, borderRadius: 20, color : "#EC4D37"} : {}}><b>Create</b></Link>
      </div>
      <div className="user-search-container">
        <SearchBar />
      </div>
      <div className="right-info">
        {token ? (
          <>
            <FontAwesomeIcon icon={faBell} size='2x' className="bell-icon" />
            <div className="hummm">
              
              <img
                src={token.AvatarUrl}
                width={50}
                className="imgAvatar"
                alt="User Detail"
                style={{ marginLeft: 10 }}
                onClick={() => {
                  navigate(UserPath.Detail)
                }}
              />

              <FontAwesomeIcon icon={faRightFromBracket} size="2x" onClick={() => {
                logout(token.Email);
              }} className="user-btn-logout" />

            </div>
          </>
        ) : (
          <div className="right-links">
            <Link to="/login" className="btn">
              <FontAwesomeIcon icon={faSignInAlt} />
            </Link>
            <Link to="/signup" className="btn">
              <FontAwesomeIcon icon={faUserPlus} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHeader;