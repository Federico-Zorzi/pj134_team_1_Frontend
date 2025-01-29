import { useState } from "react";
import { Container } from "react-bootstrap";
import AddPropertyForm from "../components/AddPropertyForm";
import { useLayoutContext } from "../context/layoutContext";

export default function AddPropertyPage() {
  const { toggleDarkMode } = useLayoutContext();

  return (
    <main data-dark-mode={toggleDarkMode}>
      <Container className="mt-4 mb-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-4 homepage-most-searched text-center">
            Aggiungi un nuovo immobile
          </h1>
          <p
            className={
              (toggleDarkMode ? "text-light" : "text-secondary") + " underline"
            }
          >
            Gli immobili saranno controllati da uno staff prima di essere
            aggiunti
          </p>
        </div>
        <AddPropertyForm />
      </Container>
    </main>
  );
}
