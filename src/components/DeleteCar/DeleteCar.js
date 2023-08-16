import { useContext } from "react";
import { FormContext } from "../Context/context";
import { useNavigate } from "react-router-dom";

function DeleteCar({ name }) {
  const { setShowDel, setShowForm, id } = useContext(FormContext);
  const navigate = useNavigate();
  const handleDelete = () => {
  };

  return (
    <>
      {" "}
      <div className="modal-header">
        <h5 className="modal-title">Classic Warning</h5>
        <button
          type="button"
          className="close"
          onClick={() => {
            setShowDel(false);
            setShowForm(false);
          }}
        >
          <span>&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {`Are you sure you want to delete ${name}?`}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setShowDel(false);
            setShowForm(false);
          }}
        >
          Cancel
        </button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Confirm
        </button>
      </div>
    </>
  );
}

export default DeleteCar;
