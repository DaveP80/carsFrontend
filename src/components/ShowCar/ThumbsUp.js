import React from 'react'
import { FaThumbsUp } from 'react-icons/fa'
function ThumbsUp({ count }) {
    return (
        <>
            <div>
                <div className="row">
                    <div className="col-md-6 d-flex align-items-center">
                        <p className="mb-0 text-warning">
                            number of interested buyers
                        </p>
                        <FaThumbsUp className="mx-2 popular-icon text-warning" />
                        <p className="mb-0 mr-2 text-success">
                            {count - 1}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThumbsUp