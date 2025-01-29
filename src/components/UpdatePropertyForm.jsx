import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../context/dataContext";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function UpdatePropertyForm({ propertyData }) {
  const { id } = useParams();
  const { userData, fetchShowProperties } = useDataContext();
  const { userInformation } = userData;
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    setFormData(propertyData);
  }, [propertyData]);

  useEffect(() => {
    if (userInformation && propertyData) {
      const checkOwnership = async () => {
        const ownerStatus = await isUserPropertyOwner(
          userInformation.id,
          propertyData.id
        );
        setIsOwner(ownerStatus);
      };
      checkOwnership();
    }
  }, [userInformation.id, propertyData.id]);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
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
    //controlli
    if (isNaN(formData.square_meters) || formData.square_meters < 50) {
      alert("I metri quadrati sono invalidi.");
      return;
    }
    if (isNaN(formData.number_of_rooms) || formData.number_of_rooms < 1) {
      alert("Il numero di stanze è invalido.");
      return;
    }
    if (isNaN(formData.number_of_beds) || formData.number_of_beds < 1) {
      alert("Il numero di letti è invalido.");
      return;
    }
    if (
      isNaN(formData.number_of_bathrooms) ||
      formData.number_of_bathrooms < 1
    ) {
      alert("Il numero dei bagni è invalido.");
      return;
    }

    fetch(`http://localhost:3000/properties/${formData.id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          alert("l'email inserita è invalida");
        }
        return;
      })
      .then((data) => {
        setShow(false);
        fetchShowProperties(id);
      });
  };

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
          <Button
            variant="dark"
            className="xs-device-btn col-lg-6 col-md-6 col-sm-6 rounded-pill"
            onClick={handleShow}
          >
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
                      <Form.Label>
                        <i className="fa-solid fa-building icon-style me-2 ms-1"></i>
                        Titolo immobile
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                      <Form.Label>
                        <i className="fa-solid fa-location-dot icon-style me-2 ms-1"></i>
                        Indirizzo
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Email">
                      <Form.Label>
                        <i className="fa-solid fa-envelope icon-style me-2 ms-1"></i>
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="reference_email"
                        value={formData.reference_email}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                      <Form.Label>
                        <i className="fa-solid fa-city icon-style me-2 ms-1"></i>
                        Città
                      </Form.Label>
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
                      <Form.Label>
                        <i className="fa-solid fa-door-open icon-style me-2 ms-1"></i>
                        Numero di stanze
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="number_of_rooms"
                        value={formData.number_of_rooms}
                        onChange={handleInputChange}
                        required
                        min="1"
                        start="1"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="beds">
                      <Form.Label>
                        <i className="fa-solid fa-bed icon-style me-2 ms-1"></i>
                        Numero di letti
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="number_of_beds"
                        value={formData.number_of_beds}
                        onChange={handleInputChange}
                        required
                        min="1"
                        start="1"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="bathrooms">
                      <Form.Label>
                        <i className="fa-solid fa-bath icon-style me-2 ms-1"></i>
                        Numero di bagni
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="number_of_bathrooms"
                        value={formData.number_of_bathrooms}
                        onChange={handleInputChange}
                        required
                        min="1"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="square-meters">
                      <Form.Label>
                        <i className="fa-solid fa-expand icon-style me-2 ms-1"></i>
                        Metri quadrati
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="square_meters"
                        value={formData.square_meters}
                        onChange={handleInputChange}
                        required
                        min="50"
                        start="50"
                      />
                    </Form.Group>
                  </div>
                </div>

                <Form.Group className="mb-3" controlId="img">
                  <Form.Label>
                    <i className="fa-solid fa-image icon-style me-2 ms-1"></i>
                    Immagine
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <i className="fa-solid fa-book icon-style me-2"></i>
                    Descrizione
                  </Form.Label>
                  <Form.Control
                    type="textarea"
                    placeholder="Inserisci una breve descrizione..."
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Inserisci la descrizione.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="property-type">
                  <Form.Label>
                    <i className="fa-solid fa-building-circle-exclamation icon-style me-2 ms-1 mt-2"></i>
                    Tipo di proprietà
                  </Form.Label>
                  <Form.Select
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleInputChange}
                    className="align-self-center form-control"
                  >
                    <option default value="2">
                      Appartamento
                    </option>
                    <option value="3">Casa indipendente</option>
                    <option value="4">Villa</option>
                    <option value="5">Villetta a schiera</option>
                    <option value="6">Chalet</option>
                    <option value="7">Baita</option>
                    <option value="1">Altro</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-flex justify-content-center mt-3">
                  <Button variant="success" type="submit">
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
