import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { validateForm, origin, carmakers, } from "../helper";
import { newEntry } from "../api";
import CarForm from "../CarForm/CarForm";
import ImageSearch from "../CarForm/ImageSearch";
import "./CreateCar.css";

function CreateCar() {
  const dataShape = {
    table: "car",
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
    model_year: 84,
    preferences: { imageURL: null, color: null }
  };
  const [entry, setEntry] = useState(dataShape);

  return (
    <div className="container mt-2 min-vh-100">
      <header>

        <h2>Create New Entry</h2>
        <p>Please fill in the required fields below:</p>
        <p>Adding an image is optional:</p>
      </header>
      <CarForm entry={entry} setEntry={setEntry} dataShape={dataShape}/>
    </div>
  );
}

export default CreateCar;