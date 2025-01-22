import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as bootstrap from "bootstrap";
import { useState, useEffect } from "react";
import { useDataContext } from "../context/dataContext";

const initialFormData = {
  city: "",
  address: "",
  nRooms: 0,
  nBeds: 0,
  propertyType: "",
};

export default function SearchBar() {
  const [formData, setFormData] = useState(initialFormData);
  const { fetchFilterProperties } = useDataContext();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    fetchFilterProperties(formData);
  }, [formData]);

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Cerca la città che desideri</Form.Label>
          <Form.Control
            type="text"
            value={formData.city}
            name="city"
            onChange={handleInputChange}
            placeholder="Città"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Cerca l'indirizzo</Form.Label>
          <Form.Control
            type="text"
            value={formData.address}
            name="address"
            onChange={handleInputChange}
            placeholder="Indirizzo"
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
            start="1"
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
            start="1"
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
