import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useDataContext } from "../context/dataContext";

const initialFormData = {
  city: "",
  address: "",
  nRooms: null,
  nBeds: null,
  propertyType: "",
};

// Translate property type
function translatePropertyType(propertyType) {
  switch (propertyType) {
    case "apartment":
      return "Appartamento";
    case "independent_house":
      return "Casa indipendente";
    case "villa":
      return "Villa";
    case "terraced_villa":
      return "Villetta a schiera";
    case "chalet":
      return "Chalet";
    case "cabin":
      return "Baita";
    case "other":
      return "Altro";
    default:
      return "Tipo sconosciuto";
  }
}

export default function SearchBar({ propertiesList }) {
  const [formData, setFormData] = useState(initialFormData);
  const { fetchFilterProperties } = useDataContext();
  const propertyTypeList = [
    "apartment",
    "independent_house",
    "villa",
    "terraced_villa",
    "chalet",
    "cabin",
  ];

  const handleIconClick = (e) => {
    event.preventDefault();
    if (e.target.getAttribute("value") == formData.propertyType) {
      setFormData((prevData) => ({
        ...prevData,
        propertyType: "",
      }));
    } else {
      const value = e.target.getAttribute("value");

      setFormData((prevData) => ({
        ...prevData,
        propertyType: value,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value, type, checked);

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    console.log(formData.propertyType);
    fetchFilterProperties(formData);
  }, [formData]);

  return (
    <div>
      <Form>
        <div className="row mt-4">
          <Form.Group
            className="col-12 col-md-6 mb-4"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Cerca la città che desideri</Form.Label>
            <Form.Control
              type="text"
              value={formData.city}
              name="city"
              onChange={handleInputChange}
              placeholder="Città"
            />
          </Form.Group>
          <Form.Group
            className="col-12 col-md-6 mb-4"
            controlId="exampleForm.ControlInput1"
          >
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
        <div className="row">
          <Form.Group
            className="col-12 col-md-3 mb-4"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Numero di stanze</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={formData.nRooms}
              name="nRooms"
              onChange={handleInputChange}
              placeholder="N. Stanze"
              start="1"
            />
          </Form.Group>
          <Form.Group
            className="col-12 col-md-3 mb-4"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Numero di letti</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={formData.nBeds}
              name="nBeds"
              onChange={handleInputChange}
              placeholder="N. Letti"
              start="1"
            />
          </Form.Group>
          <Form.Group className="col-12 col-md-6 justify-content-center ">
            <Form.Label>Tipo di proprietà</Form.Label>
            <Form.Select
              name="propertyType"
              onChange={handleInputChange}
              className="align-self-center form-control"
              aria-label="Default select example"
            >
              <option default value="">
                Qualsiasi
              </option>
              <option value="Appartamento">Appartamento</option>
              <option value="Casa indipendente">Casa indipendente</option>
              <option value="Villa">Villa</option>
              <option value="Villetta a schiera">Villetta a schiera</option>
              <option value="Chalet">Chalet</option>
              <option value="Baita">Baita</option>
            </Form.Select>
          </Form.Group>
          <div className="d-flex gap-1">
            {propertyTypeList.map((badge) => {
              return (
                <button
                  onClick={handleIconClick}
                  name="propertyType"
                  value={badge}
                  type="text"
                  className={
                    formData.propertyType == badge
                      ? `btn btn-primary`
                      : `btn btn-secondary`
                  }
                >
                  {translatePropertyType(badge)}
                </button>
              );
            })}
          </div>
        </div>
      </Form>
    </div>
  );
}
