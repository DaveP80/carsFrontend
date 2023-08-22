import React, { useState, useContext } from "react";
import { selectColor } from "../helper";
import { fetchCarImage } from "../api";
import { CarContext } from "../Context/context";
import FormOverlay from "../../common/FormOverlay";
import FormSpinner from "../../common/FormSpinner";
import "./ImageSearch.css";

function ImageSearch({
  formState,
  handleInputChange,
  showModal,
  setShowModal,
}) {
  const Results = React.lazy(() => import("./Results"));
  const { isLoading, setIsLoading } = useContext(CarContext);
  const [selColor, setSelColor] = useState(selectColor[0]);
  const [apiData, setApiData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetchCarImage(
      `${formState.make} ${formState.model.trim()} ${
        Number(formState.model_year) < 100
          ? "19" + formState.model_year.toString()
          : formState.model_year.toString() + "00"
      } ${selColor}`
    ).then((res) => {
      setApiData(res.data);
      setIsLoading(false);
    });
  };

  const handleImgClick = (data) => {
    handleInputChange("preferences", {
      imageURL: data["image"]["thumbnailLink"],
      color: selColor.toLowerCase(),
    });
  };

  const handleXClick = () => {
    handleInputChange("preferences", { imageURL: null, color: null });
    setShowModal(false);
  };
  return (
    <>
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{`Select color for ${formState.make} ${formState.model}`}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleXClick}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="colors">Select color</label>
                      <select
                        className="form-control"
                        id="colors"
                        value={selColor}
                        onChange={(e) => setSelColor(e.target.value)}
                      >
                        {selectColor.map((color, i) => {
                          return (
                            <option key={color + i.toString()} value={color}>
                              {color}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <button type="submit" className="btn btn-primary mt-4">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <React.Suspense fallback={<FormSpinner />}>
                <FormOverlay isLoading={isLoading}>
                  {apiData.hasOwnProperty("items") && (
                    <Results
                      apiData={apiData}
                      handleImgClick={handleImgClick}
                      formState={formState}
                    />
                  )}
                </FormOverlay>
              </React.Suspense>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setShowModal(false)}
              >
                {formState.preferences.imageURL ? "Save" : "Close"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

export default ImageSearch;
