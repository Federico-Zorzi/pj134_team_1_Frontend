import { useRef, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { useDataContext } from "../context/dataContext";
import { useLayoutContext } from "../context/layoutContext";

export default function SendMailForm({ property }) {
  const { userData } = useDataContext();
  const { userInformation } = userData;
  const { toggleDarkMode } = useLayoutContext();
  const [isOwner, setIsOwner] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ success: false, message: "" });

  useEffect(() => {
    if (userInformation && property) {
      setIsOwner(userInformation.id === property.owner_id);
    }
  }, [userInformation, property]);

  useEffect(() => setFeedback({ success: false, message: "" }), []);

  // EmailJS Form Submission
  const form = useRef();
  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        "service_cyrx4hr",
        "template_ney4qax",
        form.current,
        "tphVJo1OVOwJh3WVQ"
      );
      setFeedback({ success: true, message: "Email inviata con successo!" });
      form.current.reset();
      setShow(false);
    } catch (error) {
      setFeedback({ success: false, message: "Errore nell'invio dell'email." });
    } finally {
      setLoading(false);
    }
  };

  if (isOwner) {
    return null;
  }

  return (
    <>
      {feedback.success === true ? (
        ""
      ) : (
        <button
          onClick={() => setShow(true)}
          className="xs-device-btn col-lg-12 col-md-12 col-sm-12 btn btn-primary"
          aria-label="Scrivi una mail al proprietario"
        >
          Scrivi una mail al proprietario
        </button>
      )}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        data-bs-keyboard="false"
        tabIndex="-1"
        data-dark-mode={toggleDarkMode}
      >
        <div className="modal-content">
          <form ref={form} onSubmit={sendEmail}>
            <div className="modal-header">
              <h1 className="modal-title fs-5">Scrivi il tuo messaggio</h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShow(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="p-3">
                <label htmlFor="from_name" className="mb-2">
                  <i className="fa-solid fa-user icon-style me-2"></i>
                  Il tuo nome
                </label>
                <input
                  required
                  id="from_name"
                  className="form-control mb-3"
                  type="text"
                  name="from_name"
                />

                <label htmlFor="from_email" className="mb-2">
                  <i className="fa-solid fa-envelope icon-style me-2"></i>
                  La tua email
                </label>
                <input
                  required
                  id="from_email"
                  className="form-control mb-3"
                  type="email"
                  name="from_email"
                />

                <input
                  type="hidden"
                  name="to_name"
                  defaultValue={property.title}
                />
                <input
                  type="hidden"
                  name="owner_mail"
                  defaultValue={property.reference_email}
                />

                <label htmlFor="message" className="mb-2">
                  <i className="fa-solid fa-message icon-style me-2"></i>
                  Messaggio
                </label>
                <textarea
                  required
                  id="message"
                  className="form-control"
                  name="message"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => setShow(false)}
              >
                Chiudi
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Invio in corso..." : "Invia"}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {feedback.message !== "" && (
        <div
          className={`alert ${
            feedback.success ? "alert-success" : "alert-danger"
          } mb-0`}
          role="alert"
        >
          {feedback.message}
        </div>
      )}
    </>
  );
}
