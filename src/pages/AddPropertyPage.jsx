import { useState } from "react";
import { Container } from "react-bootstrap";
import AddPropertyForm from "../components/AddPropertyForm";

export default function AddPropertyPage() {
  return (
    <Container className="mt-2 mb-5">
      <h1>Add a new property</h1>
      <AddPropertyForm />
    </Container>
  );
}
