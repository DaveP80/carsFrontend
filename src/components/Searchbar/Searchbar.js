import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ searchArr }) {
  const [searchText, setSearchText] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setSearchText(inputText);
    const filtered = searchArr.filter(
      suggestion =>
        suggestion.name.toLowerCase().includes(inputText.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    if (inputText.length < (query.name && query.name.length)) setQuery("")
    if (inputText.length === 0) setFilteredSuggestions([])
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof query === 'string') return;
    // Perform your search or other action here
    else if (query.hasOwnProperty('name')) {
      setSearchText('');
      setQuery("");
      setFilteredSuggestions([])
      navigate(`/cars/${query.id}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="d-flex">
        <input
          type="text"
          value={searchText}
          onChange={handleInputChange}
          className="form-control me-2"
          placeholder="Search"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {filteredSuggestions.length > 0 && (
        <ul className="list-group mt-2" style={{ cursor: 'pointer', maxHeight: '5em', overflowY: 'auto' }}>
          {filteredSuggestions.map((suggestion, index) => (
            <li className="list-group-item" key={index} onClick={() => { setQuery(suggestion); setSearchText(suggestion.name); }}>
              {`${suggestion.name} --year '${suggestion.model_year}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
