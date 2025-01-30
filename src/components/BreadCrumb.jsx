import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLayoutContext } from "../context/layoutContext";

export default function Breadcrumb({ pageName }) {
  const { toggleDarkMode } = useLayoutContext();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <nav aria-label="breadcrumb">
        <ol className={`breadcrumb ${toggleDarkMode ? "text-white" : ""}`}>
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            {window.history.length > 2 ? (
              <button
                className="btn p-0 text-decoration-none"
                onClick={() => navigate(-1)}
              >
                Cerca
              </button>
            ) : (
              <Link to="/advanceSearch">Cerca</Link>
            )}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {pageName}
          </li>
        </ol>
      </nav>
    </div>
  );
}
