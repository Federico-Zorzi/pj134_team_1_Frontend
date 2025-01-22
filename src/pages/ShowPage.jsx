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

          <div>
            <img
              src="https://media.discordapp.net/attachments/1331260746847490151/1331307684045262928/default.jpg?ex=6791cd26&is=67907ba6&hm=68129dd9717776887f2e64fb8e9cecb6a1f94ebfd773908fa28b8ad2c739cbf7&=&format=webp"
              className="card-img-top"
              alt="..."
            />
          </div>
          <div className="card-text">Indirizzo completo</div>

          <div>La tipologia di immobile</div>
          <div>Numero di stanze</div>
          <div>Numero di letti</div>
          <div>Metri quadrati</div>
          <div>Email di riferimento</div>

          <hr />
          <h2>Recensioni degli Ospiti</h2>

          <ReviewsList />
        </div>
      )}
    </>
  );
}
