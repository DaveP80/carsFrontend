import React, { useState, useContext } from 'react'
import { selectColor } from '../helper';
import { fetchCarImage } from '../api';
import './ImageSearch.css'
import FormOverlay from '../../common/FormOverlay';
import { CarContext } from '../Context/context';
import FormSpinner from '../../common/FormSpinner';

function ImageSearch({ entry, setEntry, setShowModal, }) {
    const Results = React.lazy(() =>
        import("./Results")
    );
    const [selColor, setSelColor] = useState(selectColor[0]);
    const [apiData, setApiData] = useState({});
    const { isLoading, setIsLoading } = useContext(CarContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetchCarImage(`${entry.make} ${entry.model.trim()} ${Number(entry.model_year) < 100 ? '19' + entry.model_year.toString()
            : entry.model_year.toString() + '00'} ${selColor}`).then(res => { setApiData(res.data); setIsLoading(false); });
    };

    const handleImgClick = (data) => {
        setEntry({ ...entry, preferences: { imageURL: data['image']['thumbnailLink'], color: selColor.toLowerCase() } })
    }

    const handleXClick = () => {
        setEntry({ ...entry, preferences: { imageURL: null, color: null } })
        setShowModal(false)
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
                                                {selectColor.sort().map((color, i) => {
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

                                    {apiData.hasOwnProperty('items') && (

                                        <Results apiData={apiData} handleImgClick={handleImgClick} entry={entry} />


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
                                {entry.preferences.imageURL ? 'Save' : 'Close'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageSearch