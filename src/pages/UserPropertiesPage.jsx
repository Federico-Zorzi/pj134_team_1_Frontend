import { useDataContext } from "../context/dataContext";
import GeneralPropertyCard from "../components/GeneralPropertyCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLayoutContext } from "../context/layoutContext";

export default function UserPropertiesPage() {
  const navigate = useNavigate();
  const { userData } = useDataContext();
  const { userProperties, userInformation, isLoading } = userData;
  const { toggleDarkMode } = useLayoutContext();

  useEffect(() => {
    if (userInformation.isOwner === 0) {
      navigate("/");
    }
  }, [userInformation.isOwner]);

  return (
    <main data-dark-mode={toggleDarkMode}>
      <div className="container mb-5">
        <h1 className="fw-bold mb-4 homepage-most-searched pt-4 pb-3 text-center">
          I tuoi immobili
        </h1>
        {isLoading ? (
          <div className="d-flex spinner-container justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : userProperties.length > 0 ? (
          <div className="row row-cols-1 row-cols-xl-2 g-4 homepage-card-container">
            {userProperties.map((property, index) => {
              return <GeneralPropertyCard key={index} element={property} />;
            })}
          </div>
        ) : (
          <div className="text-center text-secondary">
            <h3>Non hai ancora immobili</h3>
          </div>
        )}
      </div>
    </main>
  );
}
