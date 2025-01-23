import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../context/dataContext";
import ReviewsList from "../components/reviews/ReviewsList";
import UpdatePropertyForm from "../components/UpdatePropertyForm";
import SendMailForm from "../components/SendMailForm";

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
            <div className="col-lg-8 col-md-12">
              <img
                src="https://media.discordapp.net/attachments/1331260746847490151/1331307684045262928/default.jpg?ex=6791cd26&is=67907ba6&hm=68129dd9717776887f2e64fb8e9cecb6a1f94ebfd773908fa28b8ad2c739cbf7&=&format=webp"
                className="card-img-top"
                alt="..."
              />
            </div>
            <div className="col-lg-4 col-md-12 mt-3">
              <div className="mt-2">
                <strong>Indirizzo</strong>
                <p>{property.address}</p>
              </div>

              <div className="mt-2">
                <strong>Tipologia di immobile</strong>
                <p>{translatePropertyType(property.property_type)}</p>
              </div>

              <div className="mt-2">
                <strong>Numero di stanze</strong>
                <p>{property.n_Rooms}</p>
              </div>

              <div className="mt-2">
                <strong>Numero di letti</strong>
                <p>{property.n_Beds}</p>
              </div>

              <div className="mt-2">
                <strong>Metri quadrati</strong>
                <p>{property.square_meters}</p>
              </div>

              <div className="mt-2">
                <strong>Email di riferimento</strong>
                <p>{property.reference_email}</p>
              </div>
              <div className="mt-2">
                <UpdatePropertyForm propertyData={property} />
              </div>
              <SendMailForm property={property} />
            </div>
          </div>
          <hr />

          <ReviewsList id={property.id} />
        </div>
      )}
    </>
  );
}
