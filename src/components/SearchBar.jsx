import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useDataContext } from "../context/dataContext";
import { Row, Col } from "react-bootstrap";

const initialFormData = {
  city: "",
  address: "",
  nRooms: "",
  nBeds: "",
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
    <div>
      <Form>
        <div className="row mt-4">
          <Form.Group className="col-12 col-md-6 mb-4" controlId="city">
            <Form.Label>
              <i className="fa-solid fa-city me-2 ms-1"></i>
              Cerca la città che desideri
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.city}
              name="city"
              onChange={handleInputChange}
              placeholder="Città"
            />
          </Form.Group>
          <Form.Group className="col-12 col-md-6 mb-4" controlId="address">
            <Form.Label>
              <i className="fa-solid fa-location-dot me-2 ms-1"></i>
              Cerca l'indirizzo
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.address}
              name="address"
              onChange={handleInputChange}
              placeholder="Indirizzo"
            />
          </Form.Group>

          <Form.Group className="col-12 col-md-6 mb-4" controlId="rooms">
            <Form.Label>
              <i className="fa-solid fa-door-open me-2 ms-1"></i>
              Numero di stanze
            </Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={formData.nRooms}
              name="nRooms"
              onChange={handleInputChange}
              placeholder="N. Stanze"
              start="1"
            />
          </Form.Group>
          <Form.Group className="col-12 col-md-6 mb-4" controlId="beds">
            <Form.Label>
              <i className="fa-solid fa-bed me-2 ms-1"></i>
              Numero di letti
            </Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={formData.nBeds}
              name="nBeds"
              onChange={handleInputChange}
              placeholder="N. Letti"
              start="1"
            />
          </Form.Group>

          <Col xs={12}>
            <Row className="badge-container row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-6 g-2">
              {propertyTypeList.map((badge, index) => {
                return (
                  <Col key={index}>
                    <button
                      onClick={handleIconClick}
                      name="propertyType"
                      value={badge}
                      type="text"
                      className={
                        formData.propertyType == badge
                          ? ` active ` +
                            `w-100 d-flex align-items-center justify-content-center flex-column btn`
                          : ` btn-light` +
                            `w-100 d-flex align-items-center justify-content-center flex-column btn`
                      }
                    >
                      {/* icons for badges */}
                      {badge == "villa" && (
                        <img
                          onClick={handleIconClick}
                          src="https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg"
                          className="d-block"
                          style={{ width: "20px", height: "20px" }}
                          alt=""
                        />
                      )}
                      {badge == "apartment" && (
                        <img
                          src="https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg"
                          className="d-block"
                          style={{ width: "20px", height: "20px" }}
                          alt=""
                        />
                      )}
                      {badge == "independent_house" && (
                        <img
                          src="https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg"
                          className="d-block"
                          style={{ width: "20px", height: "20px" }}
                          alt=""
                        />
                      )}
                      {badge == "terraced_villa" && (
                        <img
                          src="https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg"
                          className="d-block"
                          style={{ width: "20px", height: "20px" }}
                          alt=""
                        />
                      )}
                      {badge == "chalet" && (
                        <img
                          src="https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg"
                          className="d-block"
                          style={{ width: "20px", height: "20px" }}
                          alt=""
                        />
                      )}
                      {badge == "cabin" && (
                        <img
                          src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg"
                          className="d-block"
                          style={{ width: "20px", height: "20px" }}
                          alt=""
                        />
                      )}

                      {translatePropertyType(badge)}
                    </button>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </div>
      </Form>
    </div>
  );
}
