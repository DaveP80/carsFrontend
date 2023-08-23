import React, { useEffect } from "react";
import CarForm from "../CarForm/CarForm";
import { FormContext } from "../Context/context";
import { setShape } from "../helper";
import "./CreateCar.css";

function CreateCar() {
  const dataShape = setShape("create");

  useEffect(() => {
    document.getElementById("model").focus();
  }, [])

  return (
    <div className="min-vh-85 create-car">
      <div className="container p-4">
        <div className="border border-dark rounded shadow bg-gradient p-4">
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