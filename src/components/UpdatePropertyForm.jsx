import { useState, useEffect } from "react";
import { useDataContext } from "../context/dataContext";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//TODO initialformdata = dati della proprietà cliccata, id passato come prop

export default function UpdatePropertyForm({ propertyData }) {
  const { userData } = useDataContext();
  const { isUserOwner } = userData;
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    setFormData(propertyData);
  }, []);

  const handleClose = () => {
    console.log(formData);
    setShow(false);
  };

  const handleShow = () => {
    console.log(formData);
    setShow(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      {isUserOwner ? (
        <>
          <Button variant="light" onClick={handleShow}>
            Modifica l'immobile
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="fs-6">
                Assicurati che le modifiche fatte rispecchino la realtà
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                  <Form.Label>Titolo proprietà</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    // name="categoryName"
                    // value={categoryName}
                    // onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-center mt-3">
                  <Button variant="dark" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
}
