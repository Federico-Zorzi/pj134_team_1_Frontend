import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewsList from "../components/reviews/ReviewsList";
import { useDataContext } from "../context/dataContext";

export default function ShowPage() {
  const { id } = useParams();
  const { property, fetchShowProperties } = useDataContext();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchShowProperties(id), setLoader(false);
  }, []);

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
                <p>{property.property_type}</p>
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
            </div>
          </div>
          <hr />
          <h2>Recensioni degli Ospiti</h2>

          <ReviewsList id={property.id} />
        </div>
      )}
    </>
  );
}
