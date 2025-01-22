import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as bootstrap from "bootstrap";
import { useState } from "react";

const initialFormData = {
  searchTerm: "",
  nRooms: 0,
  nBeds: 0,
  propertyType: "",
};

export default function SearchBar() {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Form onSubmit={handleSearchSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Cerca l'immobile:</Form.Label>
          <Form.Control
            type="text"
            value={formData.searchTerm}
            name="searchTerm"
            onChange={handleInputChange}
            placeholder="Cerca il tuo immobile"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Numero di stanze</Form.Label>
          <Form.Control
            type="number"
            value={formData.nRooms}
            name="nRooms"
            onChange={handleInputChange}
            placeholder="Numero di stanze"
            min="1"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Numero di letti</Form.Label>
          <Form.Control
            type="number"
            value={formData.nBeds}
            name="nBeds"
            onChange={handleInputChange}
            placeholder="Numero di stanze"
            min="1"
          />
        </Form.Group>
        <Form.Select
          aria-label="Default select example"
          value={formData.propertyType}
          name="propertyType"
          onChange={handleInputChange}
        >
          <option>Seleziona il tipo di proprietà</option>
          <option value="Appartamento">Appartamento</option>
          <option value="Casa indipendente">Casa indipendente</option>
          <option value="Villa">Villa</option>
          <option value="Villetta a schiera">Villetta a schiera</option>
          <option value="Chalet">Chalet</option>
          <option value="Baita">Baita</option>
        </Form.Select>
        <Button variant="primary" type="submit">
          Cerca
        </Button>
      </Form>
    </>
  );
}
