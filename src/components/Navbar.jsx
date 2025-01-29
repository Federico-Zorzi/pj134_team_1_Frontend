import { NavLink } from "react-router-dom";
import { useDataContext } from "../context/dataContext";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouseChimneyMedical,
  faBuildingUser,
  faHouse,
  faUser,
  faUserPen,
  faUserPlus,
  faArrowRightFromBracket,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

import { useLayoutContext } from "../context/layoutContext";

export default function Navbar() {
  const { userData } = useDataContext();
  const { initialUserData, userInformation, setUserInformation } = userData;

  const { toggleDarkMode, setToggleDarkMode } = useLayoutContext();

  const userLogout = () => {
    setUserInformation(initialUserData);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold fs-2 me-auto" to="/">
          <img className="logo-navbar" src="/src/assets/img/logo.svg" alt="" />
        </NavLink>

        <button
          className="navbar-toggler me-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-lg-5">
            <li className="nav-item">
              <NavLink
                className="nav-link text-center"
                aria-current="page"
                to="/"
              >
                <FontAwesomeIcon icon={faHouse} />{" "}
                <span className="d-lg-block d-xl-inline">Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-center" to="/advanceSearch">
                <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
                <span className="d-lg-block d-xl-inline">Cerca</span>
              </NavLink>
            </li>
            {userInformation.id !== 0 ? (
              <>
                <li>
                  <NavLink className="nav-link text-center" to="/store">
                    <FontAwesomeIcon icon={faHouseChimneyMedical} />{" "}
                    <span className="d-lg-block d-xl-inline">
                      Aggiungi un immobile
                    </span>
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}

            {userInformation.isOwner ? (
              <>
                <li>
                  <NavLink
                    className="nav-link text-center"
                    to="/userproperties"
                  >
                    <FontAwesomeIcon icon={faBuildingUser} />{" "}
                    <span className="d-lg-block d-xl-inline">
                      I tuoi immobili
                    </span>
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>

          <div className="fs-5 text-white text-center" role="button">
            {userInformation.id !== 0 ? (
              <>
                <span className="navbar-user-icon">
                  {userInformation.name[0]}
                </span>
                <span className="navbar-user-name me-3">
                  {userInformation.name}
                </span>
                <button className="logout-btn me-2" onClick={userLogout}>
                  <FontAwesomeIcon
                    className="logout-icon"
                    icon={faArrowRightFromBracket}
                  />
                </button>
              </>
            ) : (
              <div className="d-flex justify-content-center">
                <NavLink className="nav-link pe-3" to="/register">
                  <FontAwesomeIcon icon={faUserPen} />{" "}
                  <span className="login-text"> Register</span>
                </NavLink>
                {/* <FontAwesomeIcon icon={faUser} className="me-2" /> */}
                <NavLink className="nav-link me-2" to="/login">
                  <FontAwesomeIcon icon={faUser} />{" "}
                  <span className="login-text"> Login</span>
                </NavLink>
              </div>
            )}
          </div>
        </div>

        <Button
          className="dark-mode-btn"
          variant="dark"
          onClick={() => {
            setToggleDarkMode(!toggleDarkMode);
          }}
        >
          <FontAwesomeIcon
            icon={toggleDarkMode ? faSun : faMoon}
            className="fa-2xl"
          />
        </Button>
      </div>
    </nav>
  );
}
