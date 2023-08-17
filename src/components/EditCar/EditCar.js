import { useContext } from "react";
import { editCarInDB } from "../api";
import {
  validateForm,
  compareObjects,
  selectColor,
  origin,
  carmakers,
} from "../helper";
import { FormContext } from "../Context/context";

function EditCar() {
  const {
    setShowForm,
    setEntry,
    entry,
    selectedOptions,
    setSelectedOptions,
  } = useContext(FormContext);

  const handleSelectChange = (event) => {
    let selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    if (!selectedValues.length) selectedValues = ["Horror"];
    setSelectedOptions(selectedValues);
    setEntry({ ...entry });
  };

  const handleCloseModal = () => {
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      compareObjects(entry, entry) ||
      !validateForm.every((item) => entry[item] !== "" || entry[item] !== null)
    ) {
      alert("Please enter on more fields");
      return;
    }
    let id = entry["id"];
    delete entry["id"];
    Object.keys(entry).forEach((item) => {
      if (entry[item] === "" || !entry[item]) delete entry[item];
    });
    await editCarInDB(entry, id)
      .then((res) => {
        setShowForm(false);
        setEntry(res.data);
      })
      .catch((e) => console.log(e));
    setShowForm(false);
  };

  function handleCarInput(e) {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">Edit car</h5>
        <button
          type="button"
          className="btn-close"
          onClick={handleCloseModal}
        ></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              className="fs-5 fw-medium form-label"
              htmlFor="original_title"
            >
              Original Name
            </label>
            <input
              required
              type="text"
              name="original_title"
              id="original_title"
              className="form-control"
              onChange={handleCarInput}
              value={entry.original_title}
            />
          </div>
          <div className="mb-3">
            <label className="fs-5 fw-medium form-label" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={handleCarInput}
              value={entry.title ?? ""}
            />
          </div>

          <div className="mb-3">
            <label
              className="fs-5 fw-medium form-label"
              htmlFor="original_language"
            >
              Color
            </label>
            <select
              required
              className="form-control"
              id="original_language"
              name="original_language"
              value={entry.original_language}
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
            <label className="fs-5 fw-medium form-label" htmlFor="release_date">
              Model Year
            </label>
            <select
              required
              className="form-control"
              id="release_date"
              name="release_date"
              value={entry.model_year}
              onChange={handleCarInput}
            >
              {[1,2,3].map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="fs-5 fw-medium form-label" htmlFor="vote_average">
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
              value={entry.vote_average ?? 3}
            />
          </div>
          <div className="mb-3">
            <label className="fs-5 fw-medium form-label" htmlFor="runtime">
              horsepower
            </label>
            <input
              required
              placeholder="Enter number, like 120"
              type="number"
              step="1"
              min="1"
              max="999"
              name="horsepower"
              id="hp"
              className="form-control"
              onChange={handleCarInput}
              value={entry.horsepower}
            />
          </div>

          <div className="mb-3">
            <label className="fs-5 fw-medium form-label" htmlFor="genre_names">
              <span>
                Origin <p className="text-sm">{entry.origin}</p>
              </span>
            </label>
            <select
              multiple
              value={selectedOptions}
              onChange={handleSelectChange}
              className="form-control"
              id="origins"
            >
              {origin.map((option, i) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="d-grid gap-2 mt-4 col-6">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCloseModal}
        >
          Close
        </button>
      </div>
    </>
  );
}

export default EditCar;
