import React from "react";
import FormSpinner from "./FormSpinner";

function FormOverlay({ children, searchLoading }) {
  return (
    <>
      {searchLoading && (
        <FormSpinner />
      )}
      {children}
    </>
  );
}

export default FormOverlay;