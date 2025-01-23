import { useState, useEffect } from "react";
import { useDataContext } from "../context/dataContext";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function UpdatePropertyForm({ propertyData }) {
  const { userData } = useDataContext();
  const { isUserOwner } = userData;
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    setFormData(propertyData);
  }, [propertyData]);

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
    fetch(`http://localhost:3000/properties/${formData.id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to submit the form");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);

        setShow(false);
      });
  };

  return (
    <>
      {isUserOwner ? (
        <>
          <Button variant="light border-dark" onClick={handleShow}>
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
                <div className="row">
                  <div className="col-6">
                    <Form.Group className="mb-3" controlId="title">
                      <Form.Label>Titolo immobile</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                      <Form.Label>Indirizzo</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="reference_email"
                        value={formData.reference_email}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                      <Form.Label>Città</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Inserisci la città"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-6">
                    <Form.Group className="mb-3" controlId="rooms">
                      <Form.Label>Numero di stanze</Form.Label>
                      <Form.Control
                        type="number"
                        name="n_Rooms"
                        value={formData.n_Rooms}
                        onChange={handleInputChange}
                        required
                        min="1"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="beds">
                      <Form.Label>Numero di letti</Form.Label>
                      <Form.Control
                        type="number"
                        name="n_Beds"
                        value={formData.n_Beds}
                        onChange={handleInputChange}
                        required
                        min="1"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="bathrooms">
                      <Form.Label>Numero di bagni</Form.Label>
                      <Form.Control
                        type="number"
                        name="n_Bathrooms"
                        value={formData.n_Bathrooms}
                        onChange={handleInputChange}
                        required
                        min="1"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="square-meters">
                      <Form.Label>Metri quadrati</Form.Label>
                      <Form.Control
                        type="number"
                        name="square_meters"
                        value={formData.square_meters}
                        onChange={handleInputChange}
                        required
                        min="50"
                      />
                    </Form.Group>
                  </div>
                </div>

                <Form.Group className="mb-3" controlId="img">
                  <Form.Label>Immagine</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="property-type">
                  <Form.Label>Tipo di proprietà</Form.Label>
                  <Form.Select
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleInputChange}
                    className="align-self-center form-control"
                  >
                    <option value="">Qualsiasi</option>
                    <option value="apartment">Appartamento</option>
                    <option value="independent_house">Casa indipendente</option>
                    <option value="villa">Villa</option>
                    <option value="terraced_villa">Villetta a schiera</option>
                    <option value="chalet">Chalet</option>
                    <option value="cabin">Baita</option>
                    <option value="other">Altro</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-flex justify-content-center mt-3">
                  <Button variant="dark" type="submit">
                    Applica le modifiche
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
