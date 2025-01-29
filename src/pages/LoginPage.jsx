import { useState } from "react";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useDataContext } from "../context/dataContext";
import { useLayoutContext } from "../context/layoutContext";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  email: "",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const { userData } = useDataContext();
  const { userInformation, setUserInformation } = userData;

  const { toggleDarkMode } = useLayoutContext();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      alert("Email mancante.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users/emails");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown server error");
      }
      const data = await response.json();

      const emailList = data.map((email) => email.email);
      if (emailList.find((email) => formData.email.toLowerCase() === email)) {
        fetch(
          `http://localhost:3000/users/specificuser?email=${formData.email}`
        )
          .then((res) => res.json())
          .then((data) => {
            setUserInformation(data[0]);
            navigate("/");
          });
      } else {
        alert("Email not found");
      }
    } catch (error) {
      console.error("Error fetching emails:", error.message);
      alert("An error occurred while checking the email. Please try again.");
    }
  };

  return (
    <main data-dark-mode={toggleDarkMode}>
      <Form onSubmit={handleSubmit}>
        <div
          className={
            "border w-lg-device w-md-device w-sm-device mx-auto rounded-5 pt-4 pb-4 px-3 mt-5" +
            (toggleDarkMode
              ? " bg-light text-dark border-light"
              : " bg-dark text-white border-dark")
          }
        >
          <p
            className={
              "text-center fs-2 pb-3 fw-bold" +
              (toggleDarkMode ? " text-dark" : " text-white")
            }
          >
            Login
          </p>
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
          <div className="mb-5">
            <NavLink
              to="/register"
              className="nav-link text-decoration-none text-secondary fw-bold text-center pt-2"
            >
              Non hai un account?
              <span className={toggleDarkMode ? " text-dark" : " text-white"}>
                {" "}
                Registrati.
              </span>
            </NavLink>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button
              type="submit"
              className="btn btn-success text-white p-2 w-100 rounded-pill"
            >
              Login
            </button>
          </div>
        </div>
      </Form>
    </main>
  );
}
