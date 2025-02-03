import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useDataContext } from "../context/dataContext";
import { useLayoutContext } from "../context/layoutContext";
import { Row, Col, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const initialFormData = {
  city: "",
  address: "",
  nRooms: "",
  nBeds: "",
  propertyType: 0,
};

const initialDistanceKmFormData = {
  cityDistanceKm: "",
  addressDistanceKm: "",
  numAddressDistanceKm: "",
};

// Translate property type

function translatePropertyType(propertyType) {
  switch (propertyType) {
    case 1:
      return "Altro";
    case 2:
      return "Appartamento";
    case 3:
      return "Casa indipendente";
    case 4:
      return "Villa";
    case 5:
      return "Villetta a schiera";
    case 6:
      return "Chalet";
    case 7:
      return "Baita";
    default:
      return "Tipo sconosciuto";
  }
}

export default function SearchBar({ activeForm }) {
  const [formData, setFormData] = useState(initialFormData);
  const { fetchFilterProperties, setIsLoading, fetchFilterByDistance } =
    useDataContext();
  const { toggleDarkMode } = useLayoutContext();
  const propertyTypeList = [2, 3, 4, 5, 6, 7];

  const [formDataDistanceKm, setFormDataDistanceKm] = useState(
    initialDistanceKmFormData
  );
  const [validated, setValidated] = useState(false);
  const minZipCode = 10;
  const maxZipCode = 98079;

  const handleInputChangeDistanceKm = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormDataDistanceKm((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmitDistanceKm = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if (
      formDataDistanceKm.cityDistanceKm &&
      formDataDistanceKm.addressDistanceKm
    ) {
      fetchFilterByDistance(formDataDistanceKm);
      setFormDataDistanceKm(initialDistanceKmFormData);
      setValidated(false);
    }
  };

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
    const debounceTimer = setTimeout(() => {
      setIsLoading(true);
      fetchFilterProperties(formData);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [formData]);

  return (
    <div>
      {activeForm ? (
        <>
          {/* Form by GeneralInformation */}
          <Form>
            <div className="row">
              {/* ADDRESS */}
              <Form.Group className="col-12 col-md-6 mb-4" controlId="city">
                <Form.Label>
                  <i className="fa-solid fa-city icon-style me-2 ms-1"></i>
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
                  <i className="fa-solid fa-location-dot icon-style me-2 ms-1"></i>
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
                  <i className="fa-solid fa-door-open icon-style me-2 ms-1"></i>
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
                  <i className="fa-solid fa-bed icon-style me-2 ms-1"></i>
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
                      <Col key={index} data-dark-mode={toggleDarkMode}>
                        <button
                          onClick={handleIconClick}
                          name="propertyType"
                          value={badge}
                          type="text"
                          className={
                            formData.propertyType == badge
                              ? ` active ` +
                                `w-100 d-flex align-items-center justify-content-center flex-column btn type-properties-badge`
                              : ` btn-light ` +
                                `w-100 d-flex align-items-center justify-content-center flex-column btn type-properties-badge`
                          }
                        >
                          {/* icons for badges */}
                          {badge == 4 && (
                            <img
                              onClick={handleIconClick}
                              src="https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg"
                              className="d-block"
                              style={{ width: "20px", height: "20px" }}
                              alt=""
                            />
                          )}
                          {badge == 2 && (
                            <img
                              src="https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg"
                              className="d-block"
                              style={{ width: "20px", height: "20px" }}
                              alt=""
                            />
                          )}
                          {badge == 3 && (
                            <img
                              src="https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg"
                              className="d-block"
                              style={{ width: "20px", height: "20px" }}
                              alt=""
                            />
                          )}
                          {badge == 5 && (
                            <img
                              src="https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg"
                              className="d-block"
                              style={{ width: "20px", height: "20px" }}
                              alt=""
                            />
                          )}
                          {badge == 6 && (
                            <img
                              src="https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg"
                              className="d-block"
                              style={{ width: "20px", height: "20px" }}
                              alt=""
                            />
                          )}
                          {badge == 7 && (
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
        </>
      ) : (
        <>
          {/* Form by DistanceKm */}
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmitDistanceKm}
          >
            <Row className="align-items-center g-4 g-xl-2">
              {/* ADDRESS */}
              <Form.Group
                as={Col}
                xs={12}
                md={6}
                lg={4}
                className="form-group-distance mb-0"
                controlId="cityDistanceKm"
              >
                <Form.Label>
                  <i className="fa-solid fa-city icon-style me-2 ms-1"></i>
                  Comune
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formDataDistanceKm.cityDistanceKm}
                  name="cityDistanceKm"
                  onChange={handleInputChangeDistanceKm}
                  placeholder="Comune"
                  required
                />
                <Form.Control.Feedback
                  className="invalid-feedback-distance"
                  type="invalid"
                >
                  Inserisci il comune.
                </Form.Control.Feedback>
              </Form.Group>

              {/*               <Form.Group
                as={Col}
                xs={12}
                md={6}
                lg={3}
                className="form-group-distance mb-0"
                controlId="zipCodeDistanceKm"
              >
                <Form.Label>
                  <i className="fa-solid fa-city icon-style me-2 ms-1"></i>
                  CAP
                </Form.Label>
                <Form.Control
                  type="number"
                  value={formDataDistanceKm.zipCodeDistanceKm}
                  name="zipCodeDistanceKm"
                  onChange={handleInputChangeDistanceKm}
                  placeholder="00000"
                  min={minZipCode}
                  max={maxZipCode}
                  required
                />
                <Form.Control.Feedback
                  className="invalid-feedback-distance"
                  type="invalid"
                >
                  Inserisci CAP del comune.
                </Form.Control.Feedback>
              </Form.Group> */}

              <Form.Group
                as={Col}
                xs={12}
                md={6}
                lg={4}
                className="form-group-distance mb-0"
                controlId="addressDistanceKm"
              >
                <Form.Label>
                  <i className="fa-solid fa-location-dot icon-style me-2 ms-1"></i>
                  Cerca l'indirizzo
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formDataDistanceKm.addressDistanceKm}
                  name="addressDistanceKm"
                  onChange={handleInputChangeDistanceKm}
                  placeholder="Indirizzo"
                  required
                />
                <Form.Control.Feedback
                  className="invalid-feedback-distance"
                  type="invalid"
                >
                  Inserisci l'indirizzo.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                as={Col}
                xs={12}
                md={6}
                lg={4}
                xl={3}
                className="form-group-distance mb-0"
                controlId="numAddressDistanceKm"
              >
                <Form.Label>
                  <i className="fa-solid fa-location-dot icon-style me-2 ms-1"></i>
                  Numero Civico *
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formDataDistanceKm.numAddressDistanceKm}
                  name="numAddressDistanceKm"
                  onChange={handleInputChangeDistanceKm}
                  placeholder="NumeroCivico"
                />

                <Form.Control.Feedback
                  className="invalid-feedback-distance"
                  type="invalid"
                >
                  Inserisci numero del civico.
                </Form.Control.Feedback>
              </Form.Group>

              <Col
                xs={12}
                md={12}
                xl={1}
                className="text-center align-self-end mt-4 mt-xl-0"
              >
                <Button
                  type="submit"
                  className={toggleDarkMode ? " btn-light" : " btn-dark"}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  <span className="d-xl-none ms-2">Cerca</span>
                </Button>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </div>
  );
}
