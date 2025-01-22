export default function ReviewItem() {
  return (
    <>
      <form
        className="row d-flex align-items-end"
        // onSubmit={handleReviewSubmit}
      >
        {/* Nome */}
        <div className="col-3">
          <label htmlFor="name" className="form-label">
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            // value={reviewForm.name}
            // onChange={handleFormChange}
          />
        </div>
        {/* Voto */}
        <div className="col-3">
          <label htmlFor="vote" className="form-label">
            Voto
          </label>
          <input
            type="text"
            id="vote"
            name="vote"
            className="form-control"
            // value={reviewForm.vote}
            // onChange={handleFormChange}
          />
        </div>
        {/* Testo */}
        <div className="col-3">
          <label htmlFor="text" className="form-label">
            Testo
          </label>
          <input
            type="text"
            id="text"
            name="text"
            className="form-control"
            // value={reviewForm.text}
            // onChange={handleFormChange}
          />
        </div>
        <div className="col-3">
          {/* Bottone per inviare la recensione */}
          <button className="btn btn-primary">Invia</button>
        </div>
      </form>
    </>
  );
}
