import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/dataContext";
import { Button, Modal, Spinner, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function PropertyDeleteButton({ propertyId }) {
  const navigate = useNavigate();
  const { userData, setProperty } = useDataContext();
  const { userInformation } = userData;
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Track error state

  useEffect(() => {
    const checkOwnership = async () => {
      try {
        const ownerStatus = await isUserPropertyOwner(
          userInformation.id,
          propertyId
        );
        setIsOwner(ownerStatus);
        setLoading(false); // Stop loading once the check is done
      } catch (err) {
        setError("Unable to verify ownership.");
        setLoading(false);
      }
    };

    checkOwnership();
  }, [userInformation.id, propertyId]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  function handleDeleteButtonClick(propertyId) {
    setLoading(true); // Start loading when deletion begins
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
        setProperty([]); // Clear property context or update it accordingly
        navigate("/"); // Redirect after deletion
      })
      .catch((err) => {
        setError("Failed to delete the property. Please try again later.");
        setLoading(false);
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
      {isOwner && !loading ? (
        <>
          <Button
            className="xs-device-btn col-lg-6 col-md-6 col-sm-6 rounded-pill"
            variant="danger"
            onClick={handleShow}
          >
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
                disabled={loading} // Disable delete button while loading
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Elimina"}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        ""
      )}
      {error && <Alert variant="danger">{error}</Alert>}{" "}
      {/* Display error if any */}
    </>
  );
}
