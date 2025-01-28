import Carousel from "react-bootstrap/Carousel";

export default function UncontrolledExample() {
  return (
    <Carousel className="homepage-carousel mb-5 h-75">
      <Carousel.Item>
        <img
          src="https://dev-snowit.ams3.digitaloceanspaces.com/uploads/2019/03/cene-in-baita.jpg"
          text="First slide"
        />
        <div className="carousel-caption2">
          <h3>Chalet nelle Alpi</h3>
          <span>Nulla di meglio per rilassarsi tra la neve.</span>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://www.vrbo.com/it-it/idee-vacanze/wp-content/uploads/5UTesrQHCfZDv7RCI3M4ei/a10dc7d17671ec2cf249dd6add39c70c/hero.jpg"
          text="Second slide"
        />
        <div className="carousel-caption2">
          <h3>Vista mare</h3>
          <span>Vuoi scappare da queste fredde giornate?</span>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://asset.montecarlosbm.com/styles/hero_image_desktop_wide_webp/s3/media/image/villa-la-vue-los-angeles-10-plus-belles-maisons-monde.jpg.webp?h=97cb7b08&itok=i1DY7ana"
          text="Third slide"
        />
        <div className="carousel-caption2">
          <h3>Notte di lusso</h3>
          <span>Concediti la possibilità di vivere una notte mozzafiato.</span>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}
