import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/dataContext";
import { Button } from "react-bootstrap";

export default function PropertyDeleteButton({ propertyId }) {
  const navigate = useNavigate();
  const { userData } = useDataContext();
  const { isUserOwner } = userData;

  function handleDeleteButtonClick(propertyId) {
    if (window.confirm("Sei sicuro di voler cancellare questo immobile?")) {
      fetch(`http://localhost:3000/properties/${propertyId}/delete`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete the property");
          }
          return res.json();
        })
        .then(navigate("/"));
    }
  }
  return (
    <>
      {isUserOwner ? (
        <Button
          variant="danger"
          onClick={() => handleDeleteButtonClick(propertyId)}
        >
          Cancella l'immobile
        </Button>
      ) : (
        ""
      )}
    </>
  );
}
