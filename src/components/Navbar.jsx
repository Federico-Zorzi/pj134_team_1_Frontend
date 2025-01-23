import { NavLink } from "react-router-dom";
import { useDataContext } from "../context/dataContext";

export default function Navbar() {
  const { userData } = useDataContext();
  const { isUserOwner, temporaryLogin } = userData;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold fs-2" to="/">
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
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/store">
                Aggiungi un immobile!
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/advanceSearch">
                Cerca
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-3 fs-5" role="button">
        <p onClick={() => temporaryLogin()}>
          {isUserOwner ? "Logout" : "Login"}
        </p>
      </div>
    </nav>
  );
}
