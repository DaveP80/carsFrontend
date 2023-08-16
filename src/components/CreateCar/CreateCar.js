import React, { useState } from "react";
import { useNavigate } from "react-router";
import { selectColor, validateForm, generateDates, origin, carmakers, } from "../helper";
import { newEntry } from "../api";

import "./CreateCar.css";

function CreateCar() {
  let navigate = useNavigate();
  const dates = generateDates();
  const [selectedOptions, setSelectedOptions] = useState(["usa"]);
  const [entry, setEntry] = useState({
  });

  const handleSelectChange = (event) => {
    let selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    if (!selectedValues.length) selectedValues = ["usa"];
    setSelectedOptions(selectedValues);
    setEntry({ ...entry, ["preferences"]: selectedValues.join(", ") });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        !validateForm.every(
          (item) => entry[item] !== "" || entry[item] !== null
        )
      ) {
        alert(
          ""
        );
        return;
      }

      await newEntry(entry).then((response) => {
        navigate(`/cars/${response.data.id}`);
      });
    } catch (e) {
      console.log(e);
    }
  }

  function handleCarInput(e) {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }

  return (
    <div className="container bg-light form-container">
      <h3 className="text-center mb-4">New Entry</h3>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                className="fs-5 fw-medium form-label"
                htmlFor="name"
              >
                Name
              </label>
              <input
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
                onChange={handleCarInput}
                value={entry.name}
              />
            </div>
            <div className="mb-3">
              <label className="fs-5 fw-medium form-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                onChange={handleCarInput}
                value={entry.name}
              />
            </div>

            <div className="mb-3">
              <label
                className="fs-5 fw-medium form-label"
                htmlFor="origin"
              >
                origin
              </label>
              <select
                required
                className="form-control"
                id="origin"
                name="origin"
                value={entry.origin}
                onChange={handleCarInput}
              >
                {selectColor.map((item, i) => {
                  return (
                    <option value={item} key={i}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-3">
              <label className="fs-5 fw-medium form-label" htmlFor="model">
                Model
              </label>
              <textarea
                required
                placeholder=""
                name="name"
                id="name"
                className="form-control"
                rows="3"
                onChange={handleCarInput}
                value={entry.name.split(" ").slice(1)}
              />
            </div>

            <div className="mb-3">
              <label className="fs-5 fw-medium form-label" htmlFor="mpg">
                mpg
              </label>
              <input
                type="text"
                name="mpg"
                id="mpg"
                className="form-control"
                onChange={handleCarInput}
                value={entry.mpg}
              />
            </div>

            <div className="mb-3">
              <label
                className="fs-5 fw-medium form-label"
                htmlFor="model_year"
              >
                Model Year
              </label>
              <select
                required
                className="form-control"
                id="model_year"
                name="model_year"
                value={entry.release_date}
                onChange={handleCarInput}
              >
                {dates.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label
                className="fs-5 fw-medium form-label"
                htmlFor="vote_average"
              >
                Your Score
              </label>
              <input
                placeholder="1 - 10"
                type="number"
                step="0.10"
                min="1"
                max="10"
                name="vote_average"
                id="vote_average"
                className="form-control"
                onChange={handleCarInput}
                value={entry.vote_average}
              />
            </div>

            <div className="mb-3">
              <label className="fs-5 fw-medium form-label" htmlFor="weight">
                Weight
              </label>
              <input
                required
                placeholder="Enter number, like 120"
                type="number"
                step="1"
                min="1"
                max="999"
                name="weight"
                id="weight"
                className="form-control"
                onChange={handleCarInput}
                value={entry.weight}
              />
            </div>

            <div className="mb-3">
              <label
                className="fs-5 fw-medium form-label"
                htmlFor="color"
              >
                Colors
              </label>
              <select
                multiple
                value={selectedOptions}
                onChange={handleSelectChange}
                className="form-control"
                id="colors"
              >
                {origin.map((option, i) => (
                  <option key={`${option.substring(0, 2)}${i}`} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-grid gap-2 mt-4 mb-4 col-6">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCar;