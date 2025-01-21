export default function ShowPage() {
  return (
    <div className="container mt-5">
      <h1>Dettaglio Immobile</h1>

      {/* Card dell'immobile */}
      <div className="card mb-3">
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Titolo immobile</h5>
          <h5 className="card-title">Numero di stanze</h5>
          <h5 className="card-title">Numero di letti</h5>
          <h5 className="card-title">Numero di letti</h5>
          <h5 className="card-title">Metri quadrati</h5>
          <h5 className="card-title">Indirizzo completo</h5>
          <h5 className="card-title">Email di riferimento</h5>
          <h5 className="card-title">La tipologia di immobile</h5>
          <p className="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p className="card-text">
            <small className="text-body-secondary">
              Last updated 3 mins ago
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}
