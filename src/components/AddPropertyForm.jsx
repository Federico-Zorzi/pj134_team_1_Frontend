import { Form, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/dataContext";

let initialFormData = {
  title: "",
  number_of_rooms: "",
  number_of_beds: "",
  number_of_bathrooms: "",
  square_meters: "",
  address: "",
  reference_email: "",
  image: "",
  city: "",
  property_type: 0,
  owner_id: 0,
  description: "",
};

export default function AddPropertyForm() {
  const navigate = useNavigate();
  const { userData } = useDataContext();
  const { userInformation } = userData;
  const [validated, setValidated] = useState(false);

  initialFormData = { reference_email: userInformation.email };
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    if (userInformation.id === 0) {
      navigate("/");
    }
  }, [userInformation.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    const RoomsValidation =
      formData.number_of_rooms &&
      parseInt(formData.number_of_rooms) > 0 &&
      parseInt(formData.number_of_rooms) <= 100;

    const BedsValidation =
      formData.number_of_beds &&
      parseInt(formData.number_of_beds) > 0 &&
      parseInt(formData.number_of_beds) <= 50;

    const BathroomsValidation =
      formData.number_of_bathrooms &&
      parseInt(formData.number_of_bathrooms) > 0 &&
      parseInt(formData.number_of_bathrooms) <= 15;

    const SquareMetersValidation =
      formData.square_meters &&
      parseInt(formData.square_meters) > 50 &&
      parseInt(formData.square_meters) <= 10000;

    formData.owner_id = userInformation.id;

    if (
      formData.title &&
      RoomsValidation &&
      BedsValidation &&
      BathroomsValidation &&
      SquareMetersValidation &&
      formData.address &&
      formData.reference_email &&
      formData.city &&
      formData.description
    ) {
      fetch("http://localhost:3000/properties/add", {
        method: "POST",
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
          setValidated(false);
          setFormData(initialFormData);

          /* back to homepage */
          navigate("/");
        });
    } else {
      console.log(formData);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Form.Group as={Col} xs={6} md={4} className="mb-3 " controlId="title">
          <Form.Label>
            <i className="fa-solid fa-building icon-style me-2"></i>
            Titolo immobile
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il titolo dell'immobile... "
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Inserisci il titolo dell'immobile.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={6} md={4} className="mb-3 " controlId="city">
          <Form.Label>
            <i className="fa-solid fa-city icon-style me-2"></i>
            Città
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci la città..."
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Inserisci la città.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          as={Col}
          xs={6}
          md={4}
          className="mb-3 "
          controlId="address"
        >
          <Form.Label>
            <i className="fa-solid fa-location-dot icon-style me-2"></i>
            Indirizzo completo
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci l'indirizzo..."
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Inserisci l'indirizzo dell'immobile.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={6} md={4} className="mb-3 " controlId="rooms">
          <Form.Label>
            <i className="fa-solid fa-door-open icon-style me-2"></i>
            Numero di stanze
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Inserisci il numero di stanze..."
            name="number_of_rooms"
            value={formData.number_of_rooms}
            onChange={handleInputChange}
            required
            min="1"
            max="100"
          />
          <Form.Control.Feedback type="invalid">
            Inserisci il numero di stanze.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={6} md={4} className="mb-3 " controlId="beds">
          <Form.Label>
            <i className="fa-solid fa-bed icon-style me-2"></i>
            Numero di letti
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Inserisci il numero di letti..."
            name="number_of_beds"
            value={formData.number_of_beds}
            onChange={handleInputChange}
            required
            min="1"
            max="50"
          />
          <Form.Control.Feedback type="invalid">
            Inserisci il numero di letti.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          as={Col}
          xs={6}
          md={4}
          className="mb-3 "
          controlId="bathrooms"
        >
          <Form.Label>
            <i className="fa-solid fa-bath icon-style me-2"></i>
            Numero di bagni
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Inserisci il numero di bagni..."
            name="number_of_bathrooms"
            value={formData.number_of_bathrooms}
            onChange={handleInputChange}
            required
            min="1"
            max="15"
          />
          <Form.Control.Feedback type="invalid">
            Inserisci il numero di bagni.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          as={Col}
          xs={6}
          md={4}
          className="mb-3 "
          controlId="square-meters"
        >
          <Form.Label>
            <i className="fa-solid fa-expand icon-style me-2"></i>
            Metri quadrati
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Inserisci i metri quadrati..."
            name="square_meters"
            value={formData.square_meters}
            onChange={handleInputChange}
            required
            min="100"
            max="10000"
          />
          <Form.Control.Feedback type="invalid">
            Inserisci i metri quadrati dell'immobile.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={6} md={4} className="mb-3 " controlId="img">
          <Form.Label>
            <i className="fa-solid fa-image icon-style me-2"></i>
            Immagine
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci un'immagine..."
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Inserisci un'immagine dell'immobile.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={6} md={4} className="mb-3 " controlId="Email">
          <Form.Label>
            <i className="fa-solid fa-envelope icon-style me-2"></i>
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Inserisci la mail per i contatti..."
            name="reference_email"
            value={formData.reference_email}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Inserisci la tua email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={6} md={12} className="mb-3 property-type ">
          <Form.Label>
            <i className="fa-solid fa-building-circle-exclamation icon-style me-2"></i>
            Tipo di proprietà
          </Form.Label>
          <Form.Select
            name="property_type"
            value={formData.property_type}
            onChange={handleInputChange}
            className="align-self-center form-control"
            aria-label="Default select example"
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
          <Form.Control.Feedback type="invalid">
            Seleziona il tipo di proprietà.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={12} md={12}>
          <Form.Label>
            <i className="fa-solid fa-book icon-style me-2"></i>
            Descrizione
          </Form.Label>
          <Form.Control
            as={"textarea"}
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
      </Row>

      <div className="d-flex justify-content-center mt-4">
        <Button className="custom-button" type="submit">
          Invia immobile
        </Button>
      </div>
    </Form>
  );
}
