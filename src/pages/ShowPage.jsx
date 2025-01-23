import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReviewsList from "../components/reviews/ReviewsList";
import { useDataContext } from "../context/dataContext";
import emailjs from "@emailjs/browser";
import { Modal } from "react-bootstrap";

export default function ShowPage() {
  const { id } = useParams();
  const { property, fetchShowProperties } = useDataContext();
  const [loader, setLoader] = useState(true);

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
              {/* <!-- Button trigger modal --> */}
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Scrivi una mail al proprietario
              </button>
            </div>
          </div>
          <hr />

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

          <ReviewsList id={property.id} />
        </div>
      )}
    </>
  );
}
