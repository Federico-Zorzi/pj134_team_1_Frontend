import { Card, Col, Row } from "react-bootstrap";

export default function ReviewItem({ review }) {
  return (
    <Col xs={12} md={6} className="g-3">
      <Card className="card cards-review bg-dark text-white">
        <Card.Header>
          <Row>
            <Col className="user">
              <span className="review-user-photo">P</span>
              {review.name}
            </Col>
            <Col className="vote text-end">{review.vote}</Col>
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
