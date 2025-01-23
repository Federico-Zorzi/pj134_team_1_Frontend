import { NavLink } from "react-router-dom";
import { useDataContext } from "../context/dataContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { userData } = useDataContext();
  const { isUserOwner, temporaryLogin } = userData;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold fs-2 me-auto" to="/">
          BoolB&B
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
            {isUserOwner && (
              <li>
                <NavLink className="nav-link" to="/store">
                  Aggiungi un immobile!
                </NavLink>
              </li>
            )}
          </ul>

          <div className="fs-5 text-white" role="button">
            <p onClick={() => temporaryLogin()} className="login">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              {isUserOwner ? "Logout" : "Login"}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
