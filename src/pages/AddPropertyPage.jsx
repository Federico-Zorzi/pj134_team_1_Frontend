import { useState } from "react";
import { Container } from "react-bootstrap";
import AddPropertyForm from "../components/AddPropertyForm";

export default function AddPropertyPage() {
  return (
    <main>
      <Container className="mt-4 mb-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-4 homepage-most-searched text-center">
            Aggiungi un nuovo immobile
          </h1>
          <p className="text-secondary underline">
            Gli immobili saranno controllati da uno staff prima di essere
            aggiunti
          </p>
        </div>
        <AddPropertyForm />
      </Container>
    </main>
  );
}
