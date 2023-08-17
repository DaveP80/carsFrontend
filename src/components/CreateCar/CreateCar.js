import React, { useState } from "react";
import { useNavigate } from "react-router";
import { selectColor, validateForm, generateDates, origin, carmakers, } from "../helper";
import { newEntry } from "../api";

import "./CreateCar.css";

function CreateCar() {
  let navigate = useNavigate();

  const [entry, setEntry] = useState({
    make: "",
    model: "",
    mpg: 23,
    cylinders: 6,
    //optional
    displacement: 194,
    horsepower: 105,
    weight: 2974,
    //optional
    acceleration: 15.6,
    origin: "usa",
    //between 70 and 99
    model_year: 76,
    preferences: { imageURL: null, color: null }
  });
  const [showMore, setShowMore] = useState(false);

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
      let temp = entry;
      temp['name'] = entry.make + " " + entry.model.trim();
      delete temp.make; delete temp.model;
      await newEntry(temp).then((response) => {
        navigate(`/cars/${response.data.id}`);
      });
    } catch (e) {
      console.log(e);
    }
  }

  function handleCarInput(e) {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }

  function handleSwitch() {
    setShowMore(!showMore);
    if (!showMore) setEntry({ ...entry, displacement: 194, acceleration: 15.6 }); 
  }

  return (
    <div className="container mt-2">
      <header>
       
    <h2>Create New Entry</h2>
    <p>Please fill in the required fields below:</p>
    <p>Adding an image is optional:</p>
    <div class="form-check form-switch" style={{float: 'right'}}>
  <input class="form-check-input" type="checkbox" role="switch" checked={showMore} onChange={handleSwitch} id="flexSwitchCheckDefault"/>
  <label class="form-check-label" for="flexSwitchCheckDefault">Advanced Form</label>

   
</div>

      </header>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="make" className="form-label">Make</label>
        <select
                required
                className="form-control"
                id="make"
                name="make"
                value={entry.make}
                onChange={handleCarInput}
              >
                {carmakers.sort().map((item, i) => {
                  return (
                    <option value={item} key={i}>
                      {item}
                    </option>
                  );
                })}
              </select>
      </div>
      <div className="mb-3">
        <label htmlFor="model" className="form-label">Model</label>
        <input type="text" className="form-control" id="model" 
          onChange={handleCarInput}
          value={entry.model}
          placeholder="please fill"
          name="model"
        required />
      </div>
      <div className="mb-3">
        <label htmlFor="mpg" className="form-label">mpg</label>
                   <input
                placeholder="10 - 45"
                type="number"
                step="0.10"
                min="9"
                max="47"
                name="mpg"
                id="mpg"
                className="form-control"
                onChange={handleCarInput}
                value={entry.mpg}
              />
      </div>
      <div className="mb-3">
        <label htmlFor="cyl" className="form-label">cylinders</label>
                   <input
                type="number"
                step="1"
                min="4"
                max="8"
                name="cylinders"
                id="cyl"
                className="form-control"
                onChange={handleCarInput}
                value={entry.cylinders}
              />
      </div>
      {showMore && 
      <div className="mb-3">
        <label htmlFor="disp" className="form-label">displacement</label>
                   <input
                type="number"
                step="1"
                min="68"
                max="455"
                name="displacement"
                id="disp"
                className="form-control"
                onChange={handleCarInput}
                value={entry.displacement}
              />
      </div>
      }
      <div className="mb-3">
        <label htmlFor="hp" className="form-label">horsepower</label>
                   <input
                type="number"
                step="1"
                min="46"
                max="280"
                name="horsepower"
                id="hp"
                className="form-control"
                onChange={handleCarInput}
                value={entry.horsepower}
              />
      </div>
      <div className="mb-3">
        <label htmlFor="wt" className="form-label">weight</label>
                   <input
                type="number"
                step="1"
                min="1600"
                max="5200"
                name="weight"
                id="wt"
                className="form-control"
                onChange={handleCarInput}
                value={entry.weight}
              />
      </div>
      {showMore &&
      <div className="mb-3">
        <label htmlFor="acc" className="form-label">acceleration</label>
                   <input
                type="number"
                step=".10"
                min="8"
                max="25"
                name="acceleration"
                id="acc"
                className="form-control"
                onChange={handleCarInput}
                value={entry.acceleration}
              />
      </div>
      }
      <div className="mb-3">
        <label htmlFor="m-year" className="form-label">model year</label>
        <select
                className="form-control"
                id="m-year"
                name="model_year"
                value={entry.model_year}
                onChange={handleCarInput}
              >
                {Array.from({ length: 100 - 70 + 1 }, (_, index) => 70 + index).map((item, i) => {
                  return (
                    <option value={item < 100 ? item : 20} key={i}>
                      {item < 100 ? item : 20}
                    </option>
                  );
                })}
              </select>
      </div>
      <div className="mb-3">
          <label className="form-label">origin</label>
          {origin.map((region) => (
            <div className="form-check-inline" key={region}>
              <input
                type="radio"
                className="form-check-input"
                id={region}
                value={region}
                name="origin"
                checked={entry.origin === region}
                onChange={handleCarInput}
              />
              <label className="form-check-label" htmlFor={region}>{region}</label>
            </div>
          ))}
        </div>
      <button type="submit" className="btn btn-primary mb-2">Submit</button>
    </form>
  </div>
  );
}

export default CreateCar;