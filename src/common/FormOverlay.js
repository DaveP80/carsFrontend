import React from "react";
import FormSpinner from "./FormSpinner";

function FormOverlay({ children, isLoading }) {
  return (
    <>
      {isLoading && (
        <FormSpinner />
      )}
      {children}
    </>
  );
}

export default FormOverlay;