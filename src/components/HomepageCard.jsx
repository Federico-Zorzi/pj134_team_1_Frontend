import { useState } from "react";
import { Link } from "react-router-dom";

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

  return (
    <div className=" position-relative" key={property.id}>
      <Link className="card" to={`/${property.id}`}>
        <img
          onClick={() => console.log(property)}
          src={
            "https://hips.hearstapps.com/hmg-prod/images/torino-with-mole-antonelliana-and-the-alps-royalty-free-image-1643015862.jpg"
          }
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title fs-5">{property.title}</h5>
          <p className="card-text">
            <i>{property.city}</i>
          </p>
          <div className="row">
            <span className="card-text col-6">€120/notte</span>
            <span className="card-text property-type-card-text col-6 text-align-end">
              <span>{property.property_type}</span>
            </span>
          </div>
        </div>
      </Link>
      <a
        className="likes-card-text"
        onClick={() => {
          addLike(property.id);
        }}
      >
        ❤{like}
      </a>
    </div>
  );
}
