import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import { useState } from "react";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");

  const handleChangeSubmit = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="my-5 d-flex align-items-end g-3"
      onSubmit={handleSearchSubmit}
    >
      <label className="form-label " htmlFor="search">
        Cerca l'immobile:
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={handleChangeSubmit}
        placeholder="Cerca il tuo immobile"
      />

      <button className="btn btn-primary ms-2">Cerca</button>
    </form>
  );
}
