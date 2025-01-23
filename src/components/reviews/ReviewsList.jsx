import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Button, Collapse } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
  const minVote = 1;
  const maxVote = 5;
  const minLivingDays = 1;
  const maxLivingDays = 9999;

  const [openCollapse, setOpenCollapse] = useState(false);

  const [reviewFormData, setReviewFormData] = useState(defaultReviewsForm);
  const [reviewsList, setReviewList] = useState([]);

  const [validated, setValidated] = useState(false);

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

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    const voteValidation =
      reviewFormData.vote &&
      reviewFormData.vote >= minVote &&
      reviewFormData.vote <= maxVote;

    const livingDaysValidation =
      reviewFormData.living_days &&
      reviewFormData.living_days >= minLivingDays &&
      reviewFormData.living_days <= maxLivingDays;

    if (
      reviewFormData.name &&
      voteValidation &&
      livingDaysValidation &&
      reviewFormData.check_in &&
      reviewFormData.content
    ) {
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

          // catch reviews data updated
          fetchIndexReviews();

          // closing form collapsing & resetting validation
          setOpenCollapse(false);
          setValidated(false);

          // reset form fields
          setReviewFormData(defaultReviewsForm);
        });
    }
  };

  return (
    <section className="my-3">
      <Row className="align-items-center">
        <Col>
          <h3>Recensioni degli Ospiti</h3>
          <p className="text-secondary">
            Le recensioni andranno controllate da uno staff prima di essere
            pubblicate
          </p>
        </Col>
        <Col className="text-end">
          <Button
            onClick={() => setOpenCollapse(!openCollapse)}
            aria-controls="collapse-form-reviews"
            aria-expanded={openCollapse}
            className="bg-dark border-dark"
          >
            <FontAwesomeIcon icon={faPlus} className="me-1" /> Aggiungi
            Recensione
          </Button>
        </Col>
        <Collapse in={openCollapse}>
          <div id="collapse-form-reviews">
            <Form
              noValidate
              validated={validated}
              onSubmit={handleReviewSubmit}
            >
              <Row>
                {/* Nome */}
                <Form.Group as={Col} xs={6} className="mb-3" controlId="title">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci nome..."
                    name="name"
                    value={reviewFormData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Inserisci il tuo nome.
                  </Form.Control.Feedback>
                </Form.Group>
                {/* Voto */}
                <Form.Group as={Col} xs={6} className="mb-3" controlId="title">
                  <Form.Label>Vote</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Inserisci voto..."
                    min={minVote}
                    max={maxVote}
                    name="vote"
                    value={reviewFormData.vote}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Inserisci un voto alla recensione (da {minVote} a {maxVote}
                    ).
                  </Form.Control.Feedback>
                </Form.Group>
                {/* Tempo di permanenza */}
                <Form.Group as={Col} xs={6} className="mb-3" controlId="title">
                  <Form.Label>Tempo di permanenza</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Giorni di permanenza..."
                    name="living_days"
                    value={reviewFormData.living_days}
                    onChange={handleInputChange}
                    min={minLivingDays}
                    max={maxLivingDays}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Inserisci il numero di giorni di permanenza presso questa
                    struttura (da {minLivingDays} a {maxLivingDays}).
                  </Form.Control.Feedback>
                </Form.Group>
                {/* Check-in */}
                <Form.Group as={Col} xs={6} className="mb-3" controlId="title">
                  <Form.Label>Check-in</Form.Label>
                  <Form.Control
                    type="date"
                    name="check_in"
                    value={reviewFormData.check_in}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Inserisci la data di arrivo in questa struttura.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Testo */}
                <Form.Group as={Col} xs={12} className="mb-3" controlId="title">
                  <Form.Label>Recensione</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Inserisci contenuto recensione..."
                    name="content"
                    value={reviewFormData.content}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Inserisci una recensione a questa struttura.
                  </Form.Control.Feedback>
                </Form.Group>
                <Col xs={12} className="text-center">
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
