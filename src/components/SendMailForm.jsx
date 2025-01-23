import { useRef } from "react";

export default function SendMailForm({ property }) {
  // emailjs
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    form.current.reset();

    emailjs
      .sendForm("service_cyrx4hr", "template_ney4qax", form.current, {
        publicKey: "tphVJo1OVOwJh3WVQ",
      })
      .then(
        () => {
          console.log(form.current);
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form ref={form} onSubmit={sendEmail}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Scrivi il tuo messaggio
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="p-3">
                  <label>Nome</label>
                  <input
                    className="form-control mb-3"
                    type="text"
                    name="from_name"
                  />
                  <label>Email</label>
                  <input
                    className="form-control mb-3"
                    type="email"
                    name="user_email"
                  />
                  <input
                    className="form-control d-none"
                    type="text"
                    name="to_name"
                    defaultValue={property.title}
                  />

                  <label>Messaggio</label>
                  <textarea className="form-control" name="message" />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Chiudi
                </button>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Invia"
                  data-bs-dismiss="modal"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
