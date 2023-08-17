import React, { useState } from 'react'
import { selectColor } from '../helper';
import { fetchCarImage } from '../api';
import './ImageSearch.css'

function ImageSearch({ entry, setEntry, setShowModal, }) {
    const [selColor, setSelColor] = useState(selectColor[0]);
    const [apiData, setApiData] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make an API call here based on the selected color
        // http 'https://www.googleapis.com/customsearch/v1?q=ford pinto 1974 green&cx=1559144145c1f40b9&searchType=image&num=5&key=AIzaSyBnKLP5a0ASM8h5iLAsPGhBMlBvHjKoKc8'
        fetchCarImage(`${entry.make} ${entry.model.trim()} ${Number(entry.model_year) < 100 ? '19' + entry.model_year.toString()
            : entry.model_year.toString() + '00'} ${selColor}`).then(res => setApiData(res.data));
    };

    const handleCheckboxClick = (data) => {
        setEntry({...entry, preferences: { imageURL: data['image']['thumbnailLink'], color: selColor.toLowerCase()}})
    }
    return (
        <>
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{`Select color for ${entry.make} ${entry.model}`}</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setShowModal(false)}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="colors">Select color</label>
                                    <select
                                        className="form-control"
                                        id="colors"
                                        value={selColor}
                                        onChange={(e) => setSelColor(e.target.value)}
                                    >
                                        {
                                            selectColor.sort().map((color, i) => {
                                                return (
                                                    <option key={color + i.toString()} value={color}>{color}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </form>

                            {apiData.hasOwnProperty('items') && (
                                <div className="mt-3">
                                    <h5>Select One:</h5>
                                    <div className="row">
                                        {apiData['items'].map((result, index) => (
                                            <div key={index} className="col-md-4 mb-3">
                                                <div className="border p-3">
                                                    <img src={result['image']['thumbnailLink']} className="img-fluid" alt="car" />
                                                    <label className="checkbox-labelmm">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-inputmm"
                                                            onChange={() => handleCheckboxClick(result)}
                                                        />
                                                        <span className="checkmarkmm"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={() => setShowModal(false)}
                            >
                               { entry.preferences.imageURL ? 'Save' : 'Close'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageSearch