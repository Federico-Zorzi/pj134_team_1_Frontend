import { Card, Col, Row } from "react-bootstrap";

export default function ReviewItem({ review }) {
  // FUNCTION FOR RATE WITH STARS
  const rateStarsConversion = (rate) => {
    let decodStars = [];
    const numbTrunc = Math.trunc(rate);
    const numOfStars = Math.round(rate);

    for (let i = 1; i <= 5; i++) {
      if (i <= numOfStars) {
        if (i == numOfStars && rate / 2 - numbTrunc >= 0.5) {
          decodStars.push(
            <i className="star fa-solid fa-star-half-stroke"></i>
          );
        } else {
          decodStars.push(<i className="star fa-solid fa-star"></i>);
        }
      } else {
        decodStars.push(<i className="star fa-regular fa-star"></i>);
      }
    }
    return decodStars;
  };

  return (
    <Col xs={12} md={6} className="g-3">
      <Card className="card cards-review bg-dark text-white">
        <Card.Header>
          <Row>
            <Col className="user">
              <span className="review-user-photo">P</span>
              {review.name}
            </Col>
            <Col className="vote text-end">
              {rateStarsConversion(review.vote)}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between">
            <p className="card-text">{review.content}</p>

            <p>
              <span className="fw-bold">Giorni permanenza </span> :
              {" " + review.living_days}
            </p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
