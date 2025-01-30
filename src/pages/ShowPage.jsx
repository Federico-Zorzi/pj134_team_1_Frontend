import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../context/dataContext";
import { useLayoutContext } from "../context/layoutContext";
import ReviewsList from "../components/reviews/ReviewsList";
import UpdatePropertyForm from "../components/UpdatePropertyForm";
import SendMailForm from "../components/SendMailForm";
import PropertyDeleteButton from "../components/PropertyDeleteButton";
import Breadcrumb from "../components/BreadCrumb";

export default function ShowPage() {
  const { id } = useParams();
  const { property, fetchShowProperties, isLoading, setIsLoading } =
    useDataContext();
  const { toggleDarkMode } = useLayoutContext();

  useEffect(() => {
    fetchShowProperties(id);
  }, [id]);

  function translatePropertyType(propertyType) {
    switch (propertyType) {
      case 1:
        return "Altro";
      case 2:
        return "Appartamento";
      case 3:
        return "Casa indipendente";
      case 4:
        return "Villa";
      case 5:
        return "Villetta a schiera";
      case 6:
        return "Chalet";
      case 7:
        return "Baita";
      default:
        return "Tipo sconosciuto";
    }
  }

  return (
    <main data-dark-mode={toggleDarkMode}>
      {isLoading ? (
        <div className="d-flex spinner-container justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <Breadcrumb pageName={property.title} />
          <h1 className="my-3">{property.title}</h1>
          <div className="row d-flex">
            {/* Immagine */}
            <div className="col-xl-6 col-md-12">
              <img
                src={`/img_properties/${property.image}`}
                className="card-img-top size-image"
                alt="..."
              />
            </div>
            <div className="col-xl-6 col-md-12 mt-3">
              <div className="row d-flex">
                {/* Indirizzo*/}
                <div className="xs-device w-sm col-lg-12 col-md-4 col-sm-6  mt-2 w-xl w-lg w-md">
                  <i className="fa-solid fa-location-dot icon-style me-2"></i>

                  <strong>Indirizzo</strong>
                  <p>{property.address}</p>
                </div>

                {/* Tipologia */}
                <div className="xs-device w-sm col-lg-12 col-md-4 col-sm-6  mt-2 w-xl w-lg w-md">
                  <i className="fa-solid fa-building icon-style me-2"></i>

                  <strong>
                    <span className="xs-detail">Tipologia di</span> Immobile
                  </strong>

                  <p>{translatePropertyType(property.property_type)}</p>
                </div>
                {/* Numero Stanze */}
                <div className="xs-device w-sm col-lg-12 col-md-4 col-sm-6 mt-2 w-xl w-lg w-md">
                  <i className="fa-solid fa-door-open icon-style me-2"></i>

                  <strong>
                    <span className="xs-detail">Numero di</span> Stanze
                  </strong>
                  <p>{property.number_of_rooms}</p>
                </div>
                {/* Numero Bagni */}
                <div className="xs-device w-sm col-lg-12 col-md-4 col-sm-6 mt-2 w-xl w-lg w-md">
                  <i className="fa-solid fa-bath icon-style me-2"></i>

                  <strong>
                    <span className="xs-detail">Numero di</span> Bagni
                  </strong>
                  <p>{property.number_of_bathrooms}</p>
                </div>
                {/* Numero Letti */}
                <div className="xs-device w-sm col-lg-12 col-md-4 col-sm-6 mt-2 w-xl w-lg w-md">
                  <i className="fa-solid fa-bed icon-style me-2"></i>

                  <strong>
                    <span className="xs-detail">Numero di</span> Letti
                  </strong>
                  <p>{property.number_of_beds}</p>
                </div>
                {/* Metri Quadrati */}
                <div className="xs-device w-sm col-lg-12 col-md-4 col-sm-6 mt-2 w-xl w-lg w-md">
                  <i className="fa-solid fa-expand icon-style me-2"></i>
                  <strong>Metri quadrati</strong>
                  <p>{property.square_meters}</p>
                </div>
                {/* Email */}
                <div className="xs-device w-sm col-lg-12 col-md-4 col-sm-6 mt-2 mt-2">
                  <i className="fa-solid fa-envelope icon-style me-2"></i>
                  <strong>Email di riferimento</strong>
                  <p>{property.reference_email}</p>
                </div>
              </div>

              <div className="d-flex gap-2 mt-5">
                {/* Bottone per invio mail */}
                <SendMailForm property={property} />
                {/* Bottone per modificare l'immobile */}
                <UpdatePropertyForm propertyData={property} />
                {/* Bottone per cancellare l'immobile */}
                <PropertyDeleteButton propertyId={id} />
              </div>
            </div>
            {/* Descrizione */}
            <div className="mt-2">
              <i className="fa-solid fa-book icon-style me-2 mt-4"></i>
              <strong>Descrizione</strong>
              <p>{property.description}</p>
            </div>
          </div>
          <hr />

          <ReviewsList id={property.id} />
        </div>
      )}
    </main>
  );
}
