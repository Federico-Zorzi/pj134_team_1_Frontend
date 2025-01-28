import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Button, Collapse } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDataContext } from "../../context/dataContext";
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

  const { userData } = useDataContext();
  const minVote = 1;
  const maxVote = 5;
  const minLivingDays = 1;
  const maxLivingDays = 9999;

  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [isLoadingFormData, setIsLoadingFormData] = useState(false);

  //controllo se lo user è owner per bloccare il form di invio recensioni
  const { userInformation } = userData;
  const [isOwner, setIsOwner] = useState(false);

  const [openCollapse, setOpenCollapse] = useState(false);

  const [reviewFormData, setReviewFormData] = useState(defaultReviewsForm);
  const [reviewsList, setReviewList] = useState([]);

  const [validated, setValidated] = useState(false);
  const getActualDate = new Date().toJSON().slice(0, 10);
  const currentDate = new Date(getActualDate);
  const checkInDate = new Date(reviewFormData.check_in);

  const fetchIndexReviews = () => {
    setIsLoadingItems(true);

    fetch(serverUrl + `/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviewList(data);

        setIsLoadingItems(false);
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
    setIsLoadingFormData(true);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setIsLoadingFormData(false);
    }
    setValidated(true);

    /* validation data */
    const voteValidation =
      reviewFormData.vote &&
      reviewFormData.vote >= minVote &&
      reviewFormData.vote <= maxVote;

    const livingDaysValidation =
      reviewFormData.living_days &&
      reviewFormData.living_days >= minLivingDays &&
      reviewFormData.living_days <= maxLivingDays;

    const checkInDateValidation =
      reviewFormData.check_in && checkInDate < currentDate;

    if (
      reviewFormData.name &&
      voteValidation &&
      livingDaysValidation &&
      checkInDateValidation &&
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
          // catch reviews data updated
          fetchIndexReviews();

          // closing form collapsing & resetting validation
          setOpenCollapse(false);
          setValidated(false);
          setIsLoadingFormData(false);

          // reset form fields
          setReviewFormData(defaultReviewsForm);
        });
    }
  };

  useEffect(() => {
    const checkOwnership = async () => {
      const ownerStatus = await isUserPropertyOwner(userInformation.id, id);
      setIsOwner(ownerStatus);
    };

    checkOwnership();
  }, [userInformation.id, id]);

  async function isUserPropertyOwner(userId, propertyId) {
    try {
      const response = await fetch(
        "http://localhost:3000/properties/" + propertyId
      );
      if (!response.ok) {
        throw new Error(`Error fetching property: ${response.statusText}`);
      }

      const data = await response.json();
      const propertyInformation = data[0];

      if (!propertyInformation) {
        console.error("No property information found");
        return false;
      }
      return propertyInformation.owner_id === parseInt(userId);
    } catch (error) {
      console.error("Error in isUserPropertyOwner:", error.message);
      return false;
    }
  }

  return (
    <section className="my-3">
      <Row className="align-items-center">
        <Col>
          <h3>
            Recensioni degli Ospiti
            <i className="fa-solid fa-pen-to-square ms-2"></i>
          </h3>
          <p className="text-secondary">
            Le recensioni saranno controllate da uno staff prima di essere
            pubblicate
          </p>
        </Col>
        {isLoadingItems ? (
          <div className="d-flex spinner-container justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <Col className="text-end">
              {isOwner ? (
                ""
              ) : (
                <>
                  <Button
                    onClick={() => setOpenCollapse(!openCollapse)}
                    aria-controls="collapse-form-reviews"
                    aria-expanded={openCollapse}
                    className="bg-dark border-dark"
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-1" /> Aggiungi
                    Recensione
                  </Button>
                </>
              )}
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
                    <Form.Group
                      as={Col}
                      xs={6}
                      className="mb-3"
                      controlId="title"
                    >
                      <Form.Label>
                        <i className="fa-solid fa-user me-2"></i>
                        Nome
                      </Form.Label>
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
                    <Form.Group
                      as={Col}
                      xs={6}
                      className="mb-3"
                      controlId="vote"
                    >
                      <Form.Label>
                        <i className="fa-regular fa-star me-2"></i>
                        Vote
                      </Form.Label>
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
                        Inserisci un voto alla recensione (da {minVote} a{" "}
                        {maxVote}
                        ).
                      </Form.Control.Feedback>
                    </Form.Group>
                    {/* Tempo di permanenza */}
                    <Form.Group
                      as={Col}
                      xs={6}
                      className="mb-3"
                      controlId="living-days"
                    >
                      <Form.Label>
                        <i className="fa-solid fa-clock me-2"></i>
                        Tempo di permanenza
                      </Form.Label>
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
                        Inserisci il numero di giorni di permanenza presso
                        questa struttura (da {minLivingDays} a {maxLivingDays}).
                      </Form.Control.Feedback>
                    </Form.Group>
                    {/* Check-in */}
                    <Form.Group
                      as={Col}
                      xs={6}
                      className="mb-3"
                      controlId="checkin"
                    >
                      <Form.Label>
                        <i className="fa-solid fa-calendar-days me-2"></i>
                        Check-in
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="check_in"
                        value={reviewFormData.check_in}
                        onChange={handleInputChange}
                        isInvalid={checkInDate >= currentDate}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Inserisci la data di arrivo in questa struttura. La data
                        inserita deve essere precedente alla data attuale
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Testo */}
                    <Form.Group
                      as={Col}
                      xs={12}
                      className="mb-3"
                      controlId="content"
                    >
                      <Form.Label>
                        <i className="fa-solid fa-pen me-2"></i>
                        Recensione
                      </Form.Label>
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
                      <Button
                        type="submit"
                        variant="success"
                        disabled={isLoadingFormData}
                      >
                        {isLoadingFormData
                          ? "Invio in corso..."
                          : "Invia recensione"}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Collapse>
          </>
        )}
      </Row>

      <Row>
        {reviewsList.length <= 0 && !isLoadingItems ? (
          <h5>Nessuna Recensione</h5>
        ) : (
          reviewsList.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))
        )}
      </Row>
    </section>
  );
}
