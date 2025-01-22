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
            <div className="col-8">
              <img
                src="https://media.discordapp.net/attachments/1331260746847490151/1331307684045262928/default.jpg?ex=6791cd26&is=67907ba6&hm=68129dd9717776887f2e64fb8e9cecb6a1f94ebfd773908fa28b8ad2c739cbf7&=&format=webp"
                className="card-img-top"
                alt="..."
              />
            </div>
            <div className="col-4">
              <div>
                <strong>Indirizzo</strong>
              </div>
              <p className="card-text">{property.address}</p>
              <div>
                <strong>Tipologia di immobile</strong>
              </div>
              <p>{property.property_type}</p>
              <div>
                <strong>Numero di stanze</strong>
              </div>
              <p>{property.n_Rooms}</p>
              <div>
                <strong>Numero di letti</strong>
              </div>
              <p>{property.n_Beds}</p>
              <div>
                <strong>Metri quadrati</strong>
              </div>
              <p>{property.square_meters}</p>
              <div>
                <strong>Email di riferimento</strong>
              </div>
              <p>{property.reference_email}</p>
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
