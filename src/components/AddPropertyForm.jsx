import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const initialFormData = {
  title: "",
  n_Rooms: 1,
  n_Beds: 1,
  n_Bathrooms: 1,
  square_meters: 1,
  address: "",
  reference_email: "",
  image: "",
  city: "",
  property_type: "",
};

export default function AddPropertyForm() {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProperty = [...properties, formData];
    setProperties(newProperty);

    setFormData(initialFormData);

    const newDataList = [...dataList];
    newDataList[id].properties = [...newProperty];
    setDataList(newDataList);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Titolo immobile</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="rooms">
        <Form.Label>Numero di stanze</Form.Label>
        <Form.Control
          type="number"
          placeholder="Number of rooms"
          name="n_Rooms"
          value={formData.n_Rooms}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="beds">
        <Form.Label>Numero di letti</Form.Label>
        <Form.Control
          type="number"
          placeholder="Number of beds"
          name="n_Beds"
          value={formData.n_Beds}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="bathrooms">
        <Form.Label>Numero di bagni</Form.Label>
        <Form.Control
          type="number"
          placeholder="Number of bathrooms"
          name="n_Bathrooms"
          value={formData.n_Bathrooms}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="square-meters">
        <Form.Label>Metri quadrati</Form.Label>
        <Form.Control
          type="number"
          placeholder="Square meters"
          name="square_meters"
          value={formData.square_meters}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Indirizzo completo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email"
          name="reference_email"
          value={formData.reference_email}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="img">
        <Form.Label>Immagine</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter img"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className=" ">
        <Form.Label>Tipo di proprietà</Form.Label>
        <Form.Select
          name="property_type"
          onChange={handleInputChange}
          className="align-self-center form-control"
          aria-label="Default select example"
        >
          <option default value="">
            Qualsiasi
          </option>
          <option value="Appartamento">Appartamento</option>
          <option value="Casa indipendente">Casa indipendente</option>
          <option value="Villa">Villa</option>
          <option value="Villetta a schiera">Villetta a schiera</option>
          <option value="Chalet">Chalet</option>
          <option value="Baita">Baita</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="city">
        <Form.Label>città</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
