import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
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
        <Button variant="primary" type="submit">
          Cerca
        </Button>
      </Form>
    </>
  );
}
