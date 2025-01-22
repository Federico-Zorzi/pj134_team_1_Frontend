import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Button, Collapse } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import ReviewItem from "./ReviewItem";

export default function ReviewsList() {
  const defaultReviewsForm = {
    name: "",
    vote: "",
    living_days: "",
    check_in: "",
    content: "",
  };
  const serverUrl = import.meta.env.VITE_SERVER_URL + "/properties";
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const [reviewFormData, setReviewFormData] = useState(defaultReviewsForm);
  const [reviewsList, setReviewList] = useState([]);

  const fetchIndexReviews = () => {
    fetch(serverUrl + `/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        console.log("show reviews", data);
        setReviewList(data);
      });
  };

  useEffect(fetchIndexReviews, []);

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

        // recupero i dati aggiornati
        fetchIndexReviews();

        setOpen(false);

        // reset dei campi del form
        setReviewFormData(defaultReviewsForm);
      });
  };

  return (
    <section className="my-3">
      <Row className="align-items-center">
        <Col>
          <h2>Recensioni degli Ospiti</h2>
        </Col>
        <Col className="text-end">
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="collapse-form-reviews"
            aria-expanded={open}
          >
            Aggiungi Recensione
          </Button>
        </Col>
        <Collapse in={open}>
          <div id="collapse-form-reviews">
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
          </div>
        </Collapse>
      </Row>

      <Row>
        {reviewsList.length > 0 ? (
          reviewsList.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))
        ) : (
          <h5>Nessuna Recensione</h5>
        )}
      </Row>
    </section>
  );
}
