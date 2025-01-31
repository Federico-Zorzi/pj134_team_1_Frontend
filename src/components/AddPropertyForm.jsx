import { Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/dataContext";

let initialFormData = {
  title: "",
  number_of_rooms: 0,
  number_of_beds: 0,
  number_of_bathrooms: 0,
  square_meters: 0,
  address: "",
  reference_email: "",
  image: "",
  municipality: "",
  property_type: 1,
  owner_id: 0,
  description: "",
  zip_code: 0,
  civic_number: "",
  latitude: 0,
  longitude: 0,
};

export default function AddPropertyForm() {
  const navigate = useNavigate();
  const { userData } = useDataContext();
  const { userInformation } = userData;
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Store error message

  initialFormData = { reference_email: userInformation.email };
  const [formData, setFormData] = useState(initialFormData);
  const [isLoadingFormData, setIsLoadingFormData] = useState(false);

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

  async function getCoordsFromAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        formData.latitude = data[0].lat;
        formData.longitude = data[0].lon;
      } else {
        throw new Error("Indirizzo o CAP inesistenti.");
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error fetching coordinates:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingFormData(true);
    setErrorMessage(""); // Reset error message

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setIsLoadingFormData(false);
      return;
    }

    setValidated(true);

    formData.owner_id = userInformation.id;

    try {
      const formattedAddress = formData.address + " " + formData.civic_number;
      await getCoordsFromAddress(formData.zip_code + " " + formData.address);

      const response = await fetch("http://localhost:3000/properties/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          address: formattedAddress,
        }),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'invio del modulo. Riprova.");
      }

      setValidated(false);
      setFormData(initialFormData);
      setIsLoadingFormData(false);

      navigate("/");
    } catch (error) {
      setIsLoadingFormData(false);
      console.error(error);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <Row>
        <Form.Group as={Col} xs={6} md={4} className="mb-3" controlId="title">
          <Form.Label>
            <i className="fa-solid fa-building icon-style me-2"></i>
            Titolo immobile
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il titolo dell'immobile..."
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Inserisci il titolo dell'immobile.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={6} md={4} className="mb-3 property-type ">
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
            <option default value="1">
              Altro
            </option>
            <option value="2">Appartamento</option>
            <option value="3">Casa indipendente</option>
            <option value="4">Villa</option>
            <option value="5">Villetta a schiera</option>
            <option value="6">Chalet</option>
            <option value="7">Baita</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Seleziona il tipo di proprietà.
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

        <Form.Group
          as={Col}
          xs={6}
          md={4}
          className="mb-3 "
          controlId="municipality"
        >
          <Form.Label>
            <i className="fa-solid fa-city icon-style me-2"></i>
            Comune
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il comune..."
            name="municipality"
            value={formData.municipality}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Inserisci il comune.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          as={Col}
          xs={6}
          md={4}
          className="mb-3 "
          controlId="zip_code"
        >
          <Form.Label>
            <i className="fa-solid fa-location-dot icon-style me-2"></i>
            Codice Postale
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Inserisci il codice postale..."
            name="zip_code"
            value={formData.zip_code}
            onChange={handleInputChange}
            required
            pattern="\d{5}"
          />
          <Form.Control.Feedback type="invalid">
            Il codice postale europeo è composto da 5 numeri.
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
            Indirizzo
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

        <Form.Group
          as={Col}
          xs={6}
          md={4}
          className="mb-3 "
          controlId="zip_code"
        >
          <Form.Label>
            <i className="fa-solid fa-location-dot icon-style me-2"></i>
            Numero civico
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il numero civico..."
            name="civic_number"
            value={formData.civic_number}
            onChange={handleInputChange}
            required
            pattern="^[a-zA-Z0-9]+$"
          />
          <Form.Control.Feedback type="invalid">
            Numero civico invalido. Usa solo numeri e lettere.
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
        <button
          className="btn custom-button"
          type="submit"
          disabled={isLoadingFormData}
        >
          {isLoadingFormData ? "Invio in corso..." : "Invia immobile"}
        </button>
      </div>
    </Form>
  );
}
