import { useState } from "react";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useDataContext } from "../context/dataContext";

const initialFormData = {
  name: "",
  surname: "",
  email: "",
  phone: "",
};

export default function RegistrationPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const { userData } = useDataContext();
  const { userInformation, setUserInformation } = userData;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const validateForm = () => {
    const { name, surname, email, phone } = formData;

    if (name.length < 3 || name.length > 50) {
      return "Il nome deve essere tra 3 e 50 caratteri.";
    }

    if (surname.length < 3 || surname.length > 50) {
      return "Il cognome deve essere tra 3 e 50 caratteri.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "L'indirizzo email non è valido.";
    }

    const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!phoneRegex.test(phone)) {
      return "Il numero di telefono deve essere nel formato 123-456-7890.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");
    setLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setFormMessage(validationError);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown server error");
      }

      setFormMessage("Registrazione completata con successo!");

      fetch(`http://localhost:3000/users/specificuser?email=${formData.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserInformation(data[0]);
          navigate("/");
        });
    } catch (error) {
      setFormMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="border border-dark w-lg-device w-md-device w-sm-device mx-auto rounded-5 pt-4 pb-4 px-3 bg-dark text-white mt-5">
          <p className="text-white text-center fs-2 pb-3 fw-bold">
            Registrazione
          </p>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-control rounded-4 bg-white border-dark text-dark"
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
              className="form-control rounded-4 bg-white border-dark text-dark"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-control rounded-4 bg-white border-dark text-dark"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="123-456-7890"
              className="form-control rounded-4 bg-white border-dark text-dark"
            />
          </Form.Group>
          {formMessage && (
            <p
              className={`text-center ${
                formMessage.startsWith("Registrazione")
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {formMessage}
            </p>
          )}
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
              disabled={loading}
            >
              {loading ? "Registrazione..." : "Registrati"}
            </button>
          </div>
        </div>
      </Form>
    </>
  );
}
