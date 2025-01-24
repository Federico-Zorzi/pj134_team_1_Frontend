import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/dataContext";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function UpdatePropertyForm({ propertyData }) {
  const { userData } = useDataContext();
  const navigate = useNavigate();
  const { userInformation } = userData;
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    setFormData(propertyData);
  }, [propertyData]);

  useEffect(() => {
    const checkOwnership = async () => {
      const ownerStatus = await isUserPropertyOwner(
        userInformation.id,
        propertyData.id
      );
      setIsOwner(ownerStatus);
    };

    checkOwnership();
  }, [userInformation.id, propertyData.id]);

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
    //controlli
    if (isNaN(formData.square_meters) || formData.square_meters < 50) {
      alert("I metri quadrati sono invalidi.");
      return;
    }
    if (isNaN(formData.n_Rooms) || formData.n_Rooms < 1) {
      alert("Il numero di stanze è invalido.");
      return;
    }
    if (isNaN(formData.n_Beds) || formData.n_Beds < 1) {
      alert("Il numero di letti è invalido.");
      return;
    }
    if (isNaN(formData.n_Bathrooms) || formData.n_Bathrooms < 1) {
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
            className="col-lg-6 col-md-6 col-sm-6"
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
                        start="1"
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
                        start="1"
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
                        start="50"
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
