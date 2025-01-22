import { Card, Col, Row } from "react-bootstrap";

export default function ReviewItem({ review }) {
  return (
    <Col xs={12} md={6} className="g-3">
      <Card className="card cards-review">
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
          <p className="card-text">{review.content}</p>
        </Card.Body>
      </Card>
    </Col>
  );
}
