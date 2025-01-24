import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/dataContext";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function PropertyDeleteButton({ propertyId }) {
  const navigate = useNavigate();
  const { userData } = useDataContext();
  const { userInformation } = userData;
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkOwnership = async () => {
      const ownerStatus = await isUserPropertyOwner(
        userInformation.id,
        propertyId
      );
      setIsOwner(ownerStatus);
    };

    checkOwnership();
  }, [userInformation.id, propertyId]);

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

  async function isUserPropertyOwner(userId, propertyId) {
    try {
      const response = await fetch(
        "http://localhost:3000/properties/" + propertyId
      );
      if (!response.ok) {
        throw new Error(`Error fetching property: ${response.statusText}`);
      }

      const data = await response.json();
      const propertyInformation = data[0];

      if (!propertyInformation) {
        console.error("No property information found");
        return false;
      }

      return propertyInformation.owner_id === parseInt(userId);
    } catch (error) {
      console.error("Error in isUserPropertyOwner:", error.message);
      return false;
    }
  }

  return (
    <>
      {isOwner ? (
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
