import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div>
      <h1>404 Error Not Found</h1>
      <Link to="/cars">more cars</Link>
    </div>
  );
}

export default Error;
