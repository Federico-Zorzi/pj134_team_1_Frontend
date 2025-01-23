import { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

export default function HomepageCard(params) {
  const property = params.element;

  //   function to add like
  const [like, setLike] = useState(property.likes);
  const addLike = (id) => {
    const url = `http://localhost:3000/properties/${id}/addlike`;
    setLike(like + 1);
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  function translatePropertyType(propertyType) {
    switch (propertyType) {
      case "apartment":
        return "Appartamento";
      case "independent_house":
        return "Casa indipendente";
      case "villa":
        return "Villa";
      case "terraced_villa":
        return "Villetta a schiera";
      case "chalet":
        return "Chalet";
      case "cabin":
        return "Baita";
      case "other":
        return "Altro";
      default:
        return "Tipo sconosciuto";
    }
  }

  return (
    <div className=" position-relative" key={property.id}>
      <Link className="card homepage-card" to={`/${property.id}`}>
        <img
          onClick={() => console.log(property)}
          src={
            "https://hips.hearstapps.com/hmg-prod/images/torino-with-mole-antonelliana-and-the-alps-royalty-free-image-1643015862.jpg"
          }
          className="card-img-top"
        />
        <div className="card-body homepage-card-body">
          <h5 className="card-title fs-5">{property.title}</h5>
          <p className="card-text homepage-card-text">
            <i>{property.city}</i>
          </p>
          <Row className="align-items-end">
            <Col>
              <span className="card-text col-6">€120/notte</span>
            </Col>
            <Col className="text-end">
              <span className="badge text-dark border border-dark">
                {translatePropertyType(property.property_type)}
              </span>
            </Col>
          </Row>
        </div>
      </Link>
      <a
        className="likes-card-text text-danger"
        onClick={() => {
          addLike(property.id);
        }}
      >
        ❤ {like}
      </a>
    </div>
  );
}
