import { NavLink } from "react-router-dom";
import { useDataContext } from "../context/dataContext";

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
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { userData } = useDataContext();
  const { initialUserData, userInformation, setUserInformation } = userData;

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
          className="navbar-toggler"
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
              <NavLink className="nav-link" aria-current="page" to="/">
                <FontAwesomeIcon icon={faHouse} /> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/advanceSearch">
                <FontAwesomeIcon icon={faMagnifyingGlass} /> Cerca
              </NavLink>
            </li>
            {userInformation.id !== 0 ? (
              <>
                <li>
                  <NavLink className="nav-link" to="/store">
                    <FontAwesomeIcon icon={faHouseChimneyMedical} /> Aggiungi un
                    immobile
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}

            {userInformation.isOwner ? (
              <>
                <li>
                  <NavLink className="nav-link" to="/userproperties">
                    <FontAwesomeIcon icon={faBuildingUser} /> I tuoi immobili
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>

          <div className="fs-5 text-white" role="button">
            {userInformation.id !== 0 ? (
              <>
                <span className="navbar-user-icon">
                  {userInformation.name[0]}
                </span>
                <span className="navbar-user-name me-3">
                  {userInformation.name}
                </span>
                <button className="logout-btn" onClick={userLogout}>
                  <FontAwesomeIcon
                    className="logout-icon"
                    icon={faArrowRightFromBracket}
                  />
                </button>
              </>
            ) : (
              <div className="d-flex">
                <NavLink className="nav-link pe-3" to="/register">
                  <FontAwesomeIcon icon={faUserPen} />{" "}
                  <span className="login-text"> Register</span>
                </NavLink>
                {/* <FontAwesomeIcon icon={faUser} className="me-2" /> */}
                <NavLink className="nav-link" to="/login">
                  <FontAwesomeIcon icon={faUser} />{" "}
                  <span className="login-text"> Login</span>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
