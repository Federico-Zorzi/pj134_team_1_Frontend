import { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import emailjs from "@emailjs/browser";

export default function SendMailForm({ property }) {
  // emailjs
  const form = useRef();
  const [show, setShow] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    setShow(false);

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
      <button
        onClick={() => setShow(true)}
        className="col-lg-12 col-md-12 col-sm-12 btn btn-primary"
      >
        Scrivi una mail al proprietario
      </button>
      <Modal show={show} data-bs-keyboard="false" tabIndex="-1">
        <div className="modal-content">
          <form ref={form} onSubmit={sendEmail}>
            <div className="modal-header">
              <h1 className="modal-title fs-5">Scrivi il tuo messaggio</h1>
              <button
                onClick={() => setShow(false)}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="p-3">
                <label>Nome</label>
                <input
                  required
                  className="form-control mb-3"
                  type="text"
                  name="from_name"
                />
                <label>Email</label>
                <input
                  required
                  className="form-control mb-3"
                  type="email"
                  name="from_email"
                />

                {/* hided field */}
                <input
                  className="form-control d-none"
                  type="text"
                  name="to_name"
                  defaultValue={property.title}
                />
                <input
                  className="form-control d-none"
                  type="text"
                  name="owner_mail"
                  defaultValue={property.reference_email}
                />

                <label>Messaggio</label>
                <textarea required className="form-control" name="message" />
              </div>
            </div>
            <div className="modal-footer">
              <input
                className="btn btn-primary"
                type="submit"
                value="Invia"
                data-bs-dismiss="modal"
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
