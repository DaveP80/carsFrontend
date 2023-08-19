import React, { useContext } from 'react'
import { CommContext } from '../Context/context'

function NewComment() {
    const { setNewName,
        setNewComment,
        newComment,
        newName,
        handleToggleInterested,
        handleAddComment,
        newInterested,
    } = useContext(CommContext)
    return (
        <div className="mt-1">
            <h5>Add a Comment</h5>
            <form onSubmit={handleAddComment}>
                <div className="mb-2">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="form-control"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <textarea
                        placeholder="Your Comment"
                        className="form-control"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </div>
                <div className="mb-2 form-check">
                    <input
                        id="isint"
                        type="checkbox"
                        className="form-check-input"
                        checked={newInterested}
                        onChange={handleToggleInterested}
                    />
                    <label htmlFor="isint" className="form-check-label"><span className="badge text-bg-light">Interested in buying?</span></label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Comment
                </button>


            </form>
        </div>
    )
}

export default NewComment