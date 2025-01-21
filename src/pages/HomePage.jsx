import { useDataContext } from "../context/dataContext";
import { Link } from "react-router-dom";

export default function HomePage() {
  //* take data from global context
  const { properties } = useDataContext();
  console.log(properties);

  return (
    <main>
      <div className="container pt-3">
        <h1 className="my-5">I più gettonati✨</h1>
        <div className="row g-3 homepage-card-container">
          {/* cards */}
          {properties.map((immobile) => {
            return (
              <>
                <Link
                  className="col-3 position-relative"
                  to={`/post/${immobile.id}`}
                  key={immobile.id}
                >
                  <div className="card">
                    <img
                      src={
                        "https://hips.hearstapps.com/hmg-prod/images/torino-with-mole-antonelliana-and-the-alps-royalty-free-image-1643015862.jpg"
                      }
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title fs-5">{immobile.title}</h5>
                      <p className="card-text">Host: {immobile.host}</p>
                    </div>
                  </div>
                </Link>
                <div className="row position-absolute">
                  <span className="card-text col-6">
                    €{immobile.price}/notte
                  </span>
                  <span className="card-text likes-card-text col-6 text-align-end">
                    <span onClick={() => console.log(immobile.likes)}>❤</span>
                    {immobile.likes}
                  </span>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </main>
  );
}
