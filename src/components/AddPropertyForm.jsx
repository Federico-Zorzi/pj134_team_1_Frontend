import { Form, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/dataContext";

const initialFormData = {
  title: "",
  n_Rooms: null,
  n_Beds: null,
  n_Bathrooms: null,
  square_meters: null,
  address: "",
  reference_email: "",
  image: "",
  city: "",
  property_type: "",
};

export default function AddPropertyForm() {
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const { userData } = useDataContext();
  const { isUserOwner } = userData;
  const [validated, setValidated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    if (!isUserOwner) {
      navigate("/");
    }
  }, [isUserOwner]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    const RoomsValidation =
      formData.n_Rooms &&
      parseInt(formData.n_Rooms) > 0 &&
      parseInt(formData.n_Rooms) <= 100;

    const BedsValidation =
      formData.n_Beds &&
      parseInt(formData.n_Beds) > 0 &&
      parseInt(formData.n_Beds) <= 50;

    const BathroomsValidation =
      formData.n_Bathrooms &&
      parseInt(formData.n_Bathrooms) > 0 &&
      parseInt(formData.n_Bathrooms) <= 15;

    const SquareMetersValidation =
      formData.square_meters &&
      parseInt(formData.square_meters) > 50 &&
      parseInt(formData.square_meters) <= 10000;

    if (
      formData.title &&
      RoomsValidation &&
      BedsValidation &&
      BathroomsValidation &&
      SquareMetersValidation &&
      formData.address &&
      formData.reference_email &&
      formData.city
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
          console.log(data);

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
        <Form.Group as={Col} xs={4} className="mb-3" controlId="title">
          <Form.Label>Titolo immobile</Form.Label>
          <Form.Control
            type="text"
            placeholder="Titolo dell'immobile "
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Inserisci il titolo dell'immobile.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={4} className="mb-3" controlId="city">
          <Form.Label>Città</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci la città"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Inserisci la città.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={4} className="mb-3" controlId="address">
          <Form.Label>Indirizzo completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci l'indirizzo"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Inserisci l'indirizzo dell'immobile.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={4} className="mb-3" controlId="rooms">
          <Form.Label>Numero di stanze</Form.Label>
          <Form.Control
            type="number"
            placeholder="Inserisci il numero di stanze"
            name="n_Rooms"
            value={formData.n_Rooms}
            onChange={handleInputChange}
            required
            min="1"
            max="100"
          />
          <Form.Control.Feedback type="invalid">
            Inserisci il numero di stanze.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={4} className="mb-3" controlId="beds">
          <Form.Label>Numero di letti</Form.Label>
          <Form.Control
            type="number"
            placeholder="Inserisci il numero di letti"
            name="n_Beds"
            value={formData.n_Beds}
            onChange={handleInputChange}
            required
            min="1"
            max="50"
          />
          <Form.Control.Feedback type="invalid">
            Inserisci il numero di letti.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={4} className="mb-3" controlId="bathrooms">
          <Form.Label>Numero di bagni</Form.Label>
          <Form.Control
            type="number"
            placeholder="Inserisci il numero di bagni"
            name="n_Bathrooms"
            value={formData.n_Bathrooms}
            onChange={handleInputChange}
            required
            min="1"
            max="15"
          />
          <Form.Control.Feedback type="invalid">
            Inserisci il numero di bagni.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={4} className="mb-3" controlId="square-meters">
          <Form.Label>Metri quadrati</Form.Label>
          <Form.Control
            type="number"
            placeholder="Inserisci i metri quadrati"
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

        <Form.Group as={Col} xs={4} className="mb-3" controlId="img">
          <Form.Label>Immagine</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci un'immagine"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Inserisci un'immagine dell'immobile.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={4} className="mb-3" controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Inserisci l'email"
            name="reference_email"
            value={formData.reference_email}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Inserisci la tua email.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <div
        className="
d-flex justify-content-center mt-2 ms-4 me-4"
      >
        <Form.Group as={Col} xs={4} className="property-type ">
          <Form.Label className="text-center">Tipo di proprietà</Form.Label>
          <Form.Select
            name="property_type"
            onChange={handleInputChange}
            className="align-self-center form-control"
            aria-label="Default select example"
          >
            <option default value="">
              Qualsiasi
            </option>
            <option value="apartment">Appartamento</option>
            <option value="independent_house">Casa indipendente</option>
            <option value="villa">Villa</option>
            <option value="terraced_villa">Villetta a schiera</option>
            <option value="chalet">Chalet</option>
            <option value="cabin">Baita</option>
            <option value="other">Altro</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Seleziona il tipo di proprietà.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <Button variant="dark" type="submit">
          Invia immobile
        </Button>
      </div>
    </Form>
  );
}
