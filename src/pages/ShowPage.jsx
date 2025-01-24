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
    <>
      {loader ? (
        ""
      ) : (
        <div className="container mt-5">
          <h1>{property.title}</h1>
          <div className="row d-flex">
            {/* Immagine */}
            <div className="col-lg-8 col-md-12">
              <img
                src="https://media.discordapp.net/attachments/1331260746847490151/1331307684045262928/default.jpg?ex=6791cd26&is=67907ba6&hm=68129dd9717776887f2e64fb8e9cecb6a1f94ebfd773908fa28b8ad2c739cbf7&=&format=webp"
                className="card-img-top"
                alt="..."
              />
            </div>
            <div className="col-lg-4 col-md-12 mt-3">
              <div className="row d-flex">
                {/* Indirizzo*/}
                <div className="col-lg-12 col-md-4 col-sm-6  mt-2">
                  <i className="fa-solid fa-location-dot me-2"></i>

                  <strong>Indirizzo</strong>
                  <p>{property.address}</p>
                </div>

                {/* Tipologia */}
                <div className="col-lg-12 col-md-4 col-sm-6  mt-2">
                  <i class="fa-solid fa-building me-2"></i>

                  <strong>Tipologia di immobile</strong>

                  <p>{translatePropertyType(property.property_type)}</p>
                </div>
                {/* Numero Stanze */}
                <div className="col-lg-12 col-md-4 col-sm-6 mt-2">
                  <i className="fa-solid fa-door-open me-2"></i>

                  <strong>Numero di stanze</strong>
                  <p>{property.n_Rooms}</p>
                </div>
                {/* Numero Bagni */}
                <div className="col-lg-12 col-md-4 col-sm-6 mt-2">
                  <i className="fa-solid fa-bath me-2"></i>

                  <strong>Numero di bagni</strong>
                  <p>{property.n_Bathrooms}</p>
                </div>
                {/* Numero Letti */}
                <div className="col-lg-12 col-md-4 col-sm-6 mt-2">
                  <i className="fa-solid fa-bed me-2"></i>

                  <strong>Numero di letti</strong>
                  <p>{property.n_Beds}</p>
                </div>
                {/* Metri Quadrati */}
                <div className="col-lg-12 col-md-4 col-sm-6 mt-2">
                  <strong>Metri quadrati</strong>
                  <p>{property.square_meters}</p>
                </div>
                {/* Email */}
                <div className="mt-2">
                  <i class="fa-solid fa-envelope me-2"></i>

                  <strong>Email di riferimento</strong>
                  <p>{property.reference_email}</p>
                </div>
              </div>

              <div className="row d-flex gap-2">
                {/* Bottone per invio mail */}
                <SendMailForm property={property} />
                <div className="d-flex gap-2 p-0">
                  {/* Bottone per modificare l'immobile */}
                  <UpdatePropertyForm propertyData={property} />
                  {/* Bottone per cancellare l'immobile */}
                  <PropertyDeleteButton propertyId={id} />
                </div>
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
