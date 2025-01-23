import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdvancedSearchCard(params) {
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
    <div
      className="col
    "
    >
      <div className="card mb-3 position-relative" key={property.id}>
        <Link to={`/${property.id}`}>
          <div className="row g-0">
            <div className="col-md-6">
              <img
                onClick={() => console.log(property)}
                src={
                  "https://hips.hearstapps.com/hmg-prod/images/torino-with-mole-antonelliana-and-the-alps-royalty-free-image-1643015862.jpg"
                }
                className="img-fluid rounded-start h-100 w-100"
                alt="..."
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                {/* Nome immobile */}
                <h5 className="card-title">{property.title}</h5>
                <p className="card-text">
                  <i>{property.city}</i>
                </p>
                <div className="d-flex gap-4 mb-3">
                  {/* Numero stanze */}
                  <div className="card-text">
                    <i class="fa-solid fa-door-open me-2"></i>
                    {property.n_Rooms}
                  </div>
                  {/* Numero bagni */}
                  <div className="card-text">
                    <i className="fa-solid fa-bath me-2"></i>
                    {property.n_Bathrooms}
                  </div>
                  {/* Numero letti */}
                  <div className="card-text">
                    <i class="fa-solid fa-bed me-2"></i>
                    {property.n_Beds}
                  </div>
                </div>
                {/* Indirizzo */}
                <div className="card-text mb-3">
                  <i className="fa-solid fa-location-dot me-2"></i>
                  {property.address}
                </div>
                {/* Metri quadrati */}
                <p className="card-text">
                  <strong>Metri quadrati </strong>
                  {property.square_meters}
                </p>
                <div className="row">
                  {/* Prezzo */}
                  <span className="card-text col-6">€120/notte</span>
                  <span className="card-text property-type-card-text col-6 text-align-end">
                    <span className="badge text-dark border border-dark">
                      {translatePropertyType(property.property_type)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
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
    </div>
  );
}
