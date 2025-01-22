import { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import ReviewItem from "./ReviewItem";

export default function ReviewsList({ id }) {
  const defaultReviewsForm = {
    name: "",
    vote: "",
    living_days: "",
    check_in: "",
    content: "",
  };
  const serverUrl = import.meta.env.VITE_SERVER_URL + "/properties";

  const [reviewFormData, setReviewFormData] = useState(defaultReviewsForm);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setReviewFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log(id);

    fetch(serverUrl + `/${id}/addreview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: reviewFormData.name,
        vote: reviewFormData.vote,
        living_days: reviewFormData.living_days,
        check_in: reviewFormData.check_in,
        content: reviewFormData.content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("store", data);

        setReviewFormData(defaultReviewsForm);
      });
  };

  return (
    <>
      <Form onSubmit={handleReviewSubmit}>
        <Row>
          {/* Nome */}
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={reviewFormData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          {/* Voto */}
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Vote</Form.Label>
              <Form.Control
                type="number"
                name="vote"
                value={reviewFormData.vote}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          {/* Tempo di permanenza */}
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Tempo di permanenza</Form.Label>
              <Form.Control
                type="number"
                placeholder="Giorni di permanenza..."
                name="living_days"
                value={reviewFormData.living_days}
                onChange={handleInputChange}
                min="1"
                required
              />
            </Form.Group>
          </Col>
          {/* Check-in */}
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Check-in</Form.Label>
              <Form.Control
                type="date"
                placeholder="Giorni di permanenza..."
                name="check_in"
                value={reviewFormData.check_in}
                onChange={handleInputChange}
                min="1"
                required
              />
            </Form.Group>
          </Col>

          {/* Testo */}
          <Col xs={12}>
            {" "}
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Contenuto recensione</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={reviewFormData.content}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col className="col-12 text-center">
            {/* Bottone per inviare la recensione */}
            <Button type="submit" variant="primary">
              Invia
            </Button>
          </Col>
        </Row>
      </Form>
      <ReviewItem />;
    </>
  );
}
