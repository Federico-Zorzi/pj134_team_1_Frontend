import { Card, Col, Row } from "react-bootstrap";

import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutContext } from "../../context/layoutContext";

export default function ReviewItem({ review }) {
  const { toggleDarkMode } = useLayoutContext();

  // FUNCTION FOR RATE WITH STARS
  const rateStarsConversion = (starNumber) => {
    let stars = [];

    for (let i = 0; i < starNumber; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStarSolid} className="star" />
      );
    }
    for (let i = starNumber; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStarRegular} className="star" />
      );
    }

    return stars;
  };

  return (
    <Col xs={12} md={6} className="g-3">
      <Card
        className={
          "card cards-review" +
          (toggleDarkMode ? " bg-light text-dark" : " bg-dark text-white")
        }
      >
        <Card.Header>
          <Row>
            <Col className="user">
              <span className="review-user-photo">{review.name[0]}</span>
              {review.name}
            </Col>
            <Col className="vote text-end">
              {rateStarsConversion(review.vote)}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <p className="card-text">{review.content}</p>
          <p className="text-end">
            <span className="fw-bold">Giorni permanenza:</span>
            {" " + review.living_days}
          </p>
        </Card.Body>
      </Card>
    </Col>
  );
}
