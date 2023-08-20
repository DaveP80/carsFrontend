import React, { useEffect } from "react";
import CarForm from "../CarForm/CarForm";
import { FormContext } from "../Context/context";
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

  useEffect(() => {
    document.getElementById("model").focus();
  }, [])
  
  return (
    <div className="min-vh-100 create-car">
      <div className="container p-4">
        <div className="border border-dark rounded bg-gradient p-4">


          <header>

            <h2>Create New Entry</h2>
            <p>Please fill in the required fields below:</p>
            <p>Adding an image is optional:</p>
          </header>
          <FormContext.Provider value={{ dataShape, }}>
            <CarForm />
          </FormContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default CreateCar;