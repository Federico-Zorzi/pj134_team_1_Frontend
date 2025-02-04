import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLayoutContext } from "../context/layoutContext";

export default function Breadcrumb({ pageName }) {
  const { toggleDarkMode } = useLayoutContext();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className={toggleDarkMode ? "text-light" : "text-black"}>
                Home
              </span>
            </Link>
          </li>
          <li className="breadcrumb-item">
            {window.history.length > 2 ? (
              <button
                className={
                  `btn p-0 text-decoration-none` +
                  (toggleDarkMode ? " text-light" : " text-black")
                }
                onClick={() => navigate("/advanceSearch")}
              >
                Cerca
              </button>
            ) : (
              <Link to="/advanceSearch">
                {" "}
                <span className={toggleDarkMode ? "text-light" : "text-black"}>
                  Cerca{" "}
                </span>
              </Link>
            )}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <span className={toggleDarkMode ? "text-light" : "text-black"}>
              {" "}
              {pageName}{" "}
            </span>
          </li>
        </ol>
      </nav>
    </div>
  );
}
