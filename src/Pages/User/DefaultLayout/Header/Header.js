import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../../Assets/Data/DataContext";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../SearchBar/SearchBar";
import { faSignInAlt, faUserPlus, faBell, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imageLogo from "../../../../Assets/Image/Logo/logo-png.png";

function Header() {
  const { token, logout } = useContext(DataContext);
  const navigate = useNavigate();
  return (
    <div className="header-container">
      <div className="left-links">
        <Link to="/">
          <img src={imageLogo} alt="Logo" width={60} style={{ borderRadius: 10 }} />
        </Link>
        <Link to="/create">Create</Link>
      </div>
      <div className="search-container">
        <SearchBar />
      </div>
      <div className="right-info">
        {token ? (
          <>
           <FontAwesomeIcon icon={faBell} size='2x'/>
          <div>
            <img
              src={token.AvatarUrl}
              width={50}
              className="imgAvatar"
              alt="User Detail"
              style={{marginLeft : 10}}
              onClick={() => {
                navigate("/detail")
              }}
            />
            <button
              onClick={() => {
                logout(token.Email);
              }}
              className="btn btn-danger"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
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

export default Header;