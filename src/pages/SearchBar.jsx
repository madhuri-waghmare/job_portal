import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBar({ setSearchTerm }) {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search by title, company, or location"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;