import { useState } from "react";
import { Container } from "react-bootstrap";
import AddPropertyForm from "../components/AddPropertyForm";

export default function AddPropertyPage() {
  return (
    <Container className="mt-2 mb-5">
      <div className="text-center mb-5">
        <h1>Aggiungi un nuovo immobile</h1>
        <p className="text-secondary underline">
          Gli immobili andranno controllati da uno staff prima di essere
          aggiunti
        </p>
      </div>
      <AddPropertyForm />
    </Container>
  );
}
