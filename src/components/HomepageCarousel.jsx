import Carousel from "react-bootstrap/Carousel";
import { useDataContext } from "../context/dataContext";

const itemsNumber = 5;

export default function UncontrolledExample() {
  const { mostPopularPropertiesList } = useDataContext();

  return (
    <Carousel className="homepage-carousel mb-5 h-75">
      {mostPopularPropertiesList
        ?.slice(0, itemsNumber)
        .map((property, index) => (
          <Carousel.Item key={property.id}>
            <img
              src={`/img_properties/${property.image}`}
              alt={property.title}
              className="d-block w-100"
            />
            <div className="carousel-caption2">
              <h3>{property.title}</h3>
              <span>
                {property.description || "Descrizione non disponibile"}
              </span>{" "}
            </div>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}
