import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/dataContext";
import { Button, Modal } from "react-bootstrap";
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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  function handleDeleteButtonClick(propertyId) {
    fetch(`http://localhost:3000/properties/${propertyId}/delete`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete the property");
        }
        return res.json();
      })
      .then((data) => {
        setShowDeleteModal(false);
        navigate("/");
      });
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
        <>
          <Button variant="danger" onClick={handleShow}>
            Cancella l'immobile
          </Button>
          <Modal show={showDeleteModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Eliminazione immobile</Modal.Title>
            </Modal.Header>
            <Modal.Body>Vuoi davvero eliminare questo immobile?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Annulla
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteButtonClick(propertyId)}
              >
                Elimina
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
}
