import { useDataContext } from "../context/dataContext";
import GeneralPropertyCard from "../components/GeneralPropertyCard";

export default function UserPropertiesPage() {
  const { userData } = useDataContext();
  const { userProperties } = userData;
  return (
    <>
      <div className="container min-vh-100">
        <h1 className="text-center fw-bold mb-3">I tuoi immobili</h1>
        <div className="row row-cols-1 row-cols-xl-2 g-4 homepage-card-container">
          {userProperties.map((property, index) => {
            return <GeneralPropertyCard key={index} element={property} />;
          })}
        </div>
      </div>
    </>
  );
}
