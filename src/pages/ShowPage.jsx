import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../context/dataContext";
import ReviewsList from "../components/reviews/ReviewsList";
import UpdatePropertyForm from "../components/UpdatePropertyForm";
import SendMailForm from "../components/SendMailForm";
import PropertyDeleteButton from "../components/PropertyDeleteButton";

export default function ShowPage() {
  const { id } = useParams();
  const { property, fetchShowProperties } = useDataContext();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchShowProperties(id), setLoader(false);
  }, []);

  function translatePropertyType(propertyType) {
    switch (propertyType) {
      case 1:
        return "Altro";
      case 2:
        return "Appartamento";
      case 3:
        return "Casa indipendente";
      case 4:
        return "Villa";
      case 5:
        return "Villetta a schiera";
      case 6:
        return "Chalet";
      case 7:
        return "Baita";
      default:
        return "Tipo sconosciuto";
    }
  }

  return (
    <>
      {loader ? (
        ""
      ) : (
        <div className="container mt-5">
          <h1>{property.title}</h1>
          <div className="row d-flex">
            {/* Immagine */}
            <div className="col-lg-6 col-md-12">
              <img
                src={`/img_properties/${property.image}`}
                className="card-img-top"
                alt="..."
              />
            </div>
            <div className="col-lg-6 col-md-12 mt-3">
              <div className="row d-flex">
                {/* Indirizzo*/}
                <div className="xs-device col-lg-12 col-md-4 col-sm-6  mt-2">
                  <i className="fa-solid fa-location-dot me-2"></i>

                  <strong>Indirizzo</strong>
                  <p>{property.address}</p>
                </div>

                {/* Tipologia */}
                <div className="xs-device col-lg-12 col-md-4 col-sm-6  mt-2">
                  <i className="fa-solid fa-building me-2"></i>

                  <strong>Tipologia di immobile</strong>

                  <p>{translatePropertyType(property.property_type)}</p>
                </div>
                {/* Numero Stanze */}
                <div className="xs-device col-lg-12 col-md-4 col-sm-6 mt-2">
                  <i className="fa-solid fa-door-open me-2"></i>

                  <strong>Numero di stanze</strong>
                  <p>{property.number_of_rooms}</p>
                </div>
                {/* Numero Bagni */}
                <div className="xs-device col-lg-12 col-md-4 col-sm-6 mt-2">
                  <i className="fa-solid fa-bath me-2"></i>

                  <strong>Numero di bagni</strong>
                  <p>{property.number_of_bathrooms}</p>
                </div>
                {/* Numero Letti */}
                <div className="xs-device col-lg-12 col-md-4 col-sm-6 mt-2">
                  <i className="fa-solid fa-bed me-2"></i>

                  <strong>Numero di letti</strong>
                  <p>{property.number_of_beds}</p>
                </div>
                {/* Metri Quadrati */}
                <div className="xs-device col-lg-12 col-md-4 col-sm-6 mt-2">
                  <strong>Metri quadrati</strong>
                  <p>{property.square_meters}</p>
                </div>
                {/* Email */}
                <div className="mt-2">
                  <i className="fa-solid fa-envelope me-2"></i>

                  <strong>Email di riferimento</strong>
                  <p>{property.reference_email}</p>
                </div>

                {/* Descrizione */}
                <div className="mt-2">
                  <i className="fa-solid fa-book me-2"></i>
                  <strong>Descrizione</strong>
                  <p>{property.description}</p>
                </div>
              </div>

              <div className="d-flex gap-2 mt-3">
                {/* Bottone per invio mail */}
                <SendMailForm property={property} />
                {/* Bottone per modificare l'immobile */}
                <UpdatePropertyForm propertyData={property} />
                {/* Bottone per cancellare l'immobile */}
                <PropertyDeleteButton propertyId={id} />
              </div>
            </div>
          </div>
          <hr />

          <ReviewsList id={property.id} />
        </div>
      )}
    </>
  );
}
