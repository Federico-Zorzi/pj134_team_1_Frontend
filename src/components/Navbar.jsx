import { NavLink } from "react-router-dom";
import { useDataContext } from "../context/dataContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { userData } = useDataContext();
  const { userInformation } = userData;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 px-3">
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
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/advanceSearch">
                Cerca
              </NavLink>
            </li>
            {userInformation.isOwner === 1 ? (
              <li>
                <NavLink className="nav-link" to="/store">
                  Aggiungi un immobile
                </NavLink>
              </li>
            ) : (
              ""
            )}
          </ul>

          <div className="fs-5 text-white" role="button">
            {userInformation.id !== 0 ? (
              "Benvenuto " + userInformation.name
            ) : (
              <div className="d-flex">
                <NavLink className="nav-link px-2" to="/register">
                  Register
                </NavLink>
                {/* <FontAwesomeIcon icon={faUser} className="me-2" /> */}
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
