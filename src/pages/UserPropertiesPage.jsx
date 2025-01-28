import { useDataContext } from "../context/dataContext";
import GeneralPropertyCard from "../components/GeneralPropertyCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function UserPropertiesPage() {
  const navigate = useNavigate();
  const { userData } = useDataContext();
  const { userProperties, userInformation, isLoading } = userData;

  useEffect(() => {
    if (userInformation.isOwner === 0) {
      navigate("/");
    }
  }, [userInformation.isOwner]);

  return (
    <main>
      <div className="container">
        <h1 className="fw-bold mb-4 homepage-most-searched pt-4 pb-3 text-center">
          I tuoi immobili
        </h1>
        {isLoading ? (
          <div className="d-flex spinner-container justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-xl-2 g-4 homepage-card-container">
            {userProperties.map((property, index) => {
              return <GeneralPropertyCard key={index} element={property} />;
            })}
          </div>
        )}
      </div>
    </main>
  );
}
