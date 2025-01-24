import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/dataContext";
import { Button, Modal } from "react-bootstrap";

export default function PropertyDeleteButton({ propertyId }) {
  const navigate = useNavigate();
  const { userData } = useDataContext();
  const { isUserOwner } = userData;

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
  return (
    <>
      {isUserOwner ? (
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
