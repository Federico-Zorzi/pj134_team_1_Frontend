import { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const initialFormData = {
  name: "",
  surname: "",
  email: "",
  phone: "",
};

export default function RegistrationPage() {
  const [formData, setFormData] = useState(initialFormData);

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
    console.log(formData.email);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="border border-dark w-25 mx-auto rounded-5 pt-4 pb-4 px-3 bg-dark text-white mt-5">
          <p className="text-white text-center fs-2 pb-3 fw-bold">
            Registrazione
          </p>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="tet"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-control rounded-4 rounded-4 bg-white border-dark text-dark"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="surname">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              required
              className="form-control rounded-4 rounded-4 bg-white border-dark text-dark"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-control rounded-4 rounded-4 bg-white border-dark text-dark"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="form-control rounded-4 rounded-4 bg-white border-dark text-dark"
            />
          </Form.Group>
          <div className="mb-5">
            <NavLink
              to="/register"
              className="nav-link text-decoration-none text-secondary fw-bold text-center pt-2"
            >
              Hai già un account?
              <span className="text-white"> Login.</span>
            </NavLink>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button
              type="submit"
              className="btn logo-green text-white p-2 w-100 rounded-pill"
            >
              Login
            </button>
          </div>
        </div>
      </Form>
    </>
  );
}
