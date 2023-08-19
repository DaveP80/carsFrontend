import React from 'react'
import "./ImageSearch.css"


function Results({ apiData, handleImgClick, formState, }) {

    return (
        <div className="mt-3">
            <h5>Select One:</h5>
            <div className="d-flex flex-wrap justify-content-center">
                {apiData['items'].map((result, index) => (
                    <div key={index} className="col-md-4 mb-1 d-flex justify-content-center">
                        <div
                            className={`${formState.preferences.imageURL === result['image']['thumbnailLink']
                                ? 'selected-item'
                                : ''
                                }`}
                            onClick={() => handleImgClick(result)}
                        >
                            <img
                                src={result['image']['thumbnailLink']}
                                className="img-fluid"
                                alt="car"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Results