import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialFormData = {
  title: "",
  n_Rooms: 1,
  n_Beds: 1,
  n_Bathrooms: 1,
  square_meters: 1,
  address: "",
  reference_email: "",
  image: "",
  city: "",
  property_type: "",
};

export default function AddPropertyForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        alert("Proprità aggiunta con successo!");
        setFormData(initialFormData);
        setIsSubmitted(true);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titolo immobile</Form.Label>
          <Form.Control
            type="text"
            placeholder="Titolo dell'immobile "
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="rooms">
          <Form.Label>Numero di stanze</Form.Label>
          <Form.Control
            type="number"
            placeholder="Inserisci il numero di stanze"
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
            placeholder="Inserisci il numero di letti"
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
            placeholder="Inserisci il numero di bagn"
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
            placeholder="Inserisci i metri quadrati"
            name="square_meters"
            value={formData.square_meters}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Indirizzo completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci l'indirizzo"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci l'email"
            name="reference_email"
            value={formData.reference_email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="img">
          <Form.Label>Immagine</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci un'immagine"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className=" ">
          <Form.Label>Tipo di proprietà</Form.Label>
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
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label>città</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci la città"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {isSubmitted && (
        <div className="mt-3">
          <p>La proprietà è stata aggiunta con successo!</p>
          <Link to="/" className="btn btn-success">
            Torna alla Home
          </Link>
        </div>
      )}
    </div>
  );
}
