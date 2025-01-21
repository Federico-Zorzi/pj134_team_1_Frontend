export default function AddPropertyPage() {
  return (
    <section id="form-immobili">
      <div className="container">
        <h2 className="page-title">Aggiungi un nuovo immobile</h2>
        <div className="form-container">
          <form className="row align-items mb-3">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Titolo immobile
              </label>
              <input
                name="title"
                //   onChange={}
                //   value={}
                type="text"
                className="form-control"
                id="title"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="rooms" className="form-label">
                Numero di stanze
              </label>
              <input
                name="rooms"
                //   onChange={}
                //   value={}
                type="text"
                className="form-control"
                id="rooms"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="beds" className="form-label">
                Numero di letti
              </label>
              <input
                name="beds"
                //   onChange={}
                //   value={}
                type="text"
                className="form-control"
                id="beds"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="bathrooms" className="form-label">
                Numero di bagni
              </label>
              <input
                name="bathrooms"
                //   onChange={}
                //   value={}
                type="text"
                className="form-control"
                id="bathrooms"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="square-metres" className="form-label">
                Metri quadrati
              </label>
              <input
                name="square-metres"
                //   onChange={}
                //   value={}
                type="text"
                className="form-control"
                id="square-metres"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Indirizzo completo
              </label>
              <input
                name="address"
                //   onChange={}
                //   value={}
                type="text"
                className="form-control"
                id="address"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email di riferimento
              </label>
              <input
                name="email"
                //   onChange={}
                //   value={}
                type="text"
                className="form-control"
                id="email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="img" className="form-label">
                Immagine
              </label>
              <input
                name="img"
                //   onChange={}
                //   value={}
                type="text"
                className="form-control"
                id="img"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="type-property" className="form-label">
                tipologia di immobile
              </label>
              <input
                name="type-property"
                //   onChange={}
                //   value={}
                type="text"
                className="form-control"
                id="type-property"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                città
              </label>
              <input
                name="city"
                //   onChange={}
                //   value={}
                type="text"
                className="form-control"
                id="city"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
