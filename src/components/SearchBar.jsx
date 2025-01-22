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
    <div className="w-50">
      <Form>
        <div className="row m-4">
          <Form.Group className="col-6" controlId="exampleForm.ControlInput1">
            <Form.Label>Cerca la città che desideri</Form.Label>
            <Form.Control
              type="text"
              value={formData.city}
              name="city"
              onChange={handleInputChange}
              placeholder="Città"
            />
          </Form.Group>
          <Form.Group className="col-6" controlId="exampleForm.ControlInput1">
            <Form.Label>Cerca l'indirizzo</Form.Label>
            <Form.Control
              type="text"
              value={formData.address}
              name="address"
              onChange={handleInputChange}
              placeholder="Indirizzo"
            />
          </Form.Group>
        </div>
        <div className="row m-4">
          <Form.Group className="col-6" controlId="exampleForm.ControlInput1">
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
          <Form.Group className="col-6" controlId="exampleForm.ControlInput1">
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
        </div>
        <div className="m-5 d-flex justify-content-center">
          <Form.Select
            value={formData.propertyType}
            name="propertyType"
            onChange={handleInputChange}
            className="align-self-center"
          >
            <option>Tipo di proprietà</option>
            <option value="Appartamento">Appartamento</option>
            <option value="Casa indipendente">Casa indipendente</option>
            <option value="Villa">Villa</option>
            <option value="Villetta a schiera">Villetta a schiera</option>
            <option value="Chalet">Chalet</option>
            <option value="Baita">Baita</option>
          </Form.Select>
        </div>
      </Form>
    </div>
  );
}
