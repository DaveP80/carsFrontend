import React, { useState, useContext } from 'react';
import NewComment from './NewComment';
import { CommContext } from '../Context/context';
import { makeComment } from '../commentapi';

function CommentThread({ commentz }) {
    const [comments, setComments] = useState(commentz);
    const [newName, setNewName] = useState('');
    const [newComment, setNewComment] = useState('');
    const [newInterested, setNewInterested] = useState(false);
    const { count, setCount, id } = useContext(CommContext);

    const commValues = {
        setNewName,
        setNewComment,
        newComment,
        newName,
        handleToggleInterested,
        handleAddComment,
        newInterested,
    };

    async function handleAddComment(e) {
        e.preventDefault()
        if (newName && newComment) {
            const newCommentObj = {
                car_id: id,
                name: newName.trim(),
                comment: newComment.trim(),
                isinterested: newInterested
            };
            if (!newCommentObj.isinterested) delete newCommentObj.isinterested;
            await makeComment(newCommentObj).then(res => {
                if (newCommentObj.isinterested) setCount(count + 1);
                setComments([...comments, newCommentObj]);
                setNewName('');
                setNewComment('');
                setNewInterested(false);
            }).catch(e => {
                setNewName('');
                setNewComment('');
                setNewInterested(false);
            })
        }
    };

    function handleToggleInterested() {
        setNewInterested(!newInterested);
    };

    return (
        <div className='mt-2'>
            {
                !comments[0]['name'] && comments.length < 2 ?
                    (
                        <div className="alert alert-info text-center" role="alert">
                            No comments, You can be the first.
                        </div>
                    ) :
                    <>

                        <h3>Comment Thread</h3>
                        <ul className="list-group">
                            {comments.map((comment, index) => {
                                if (comment.name)
                                    return <li className="list-group-item py-0 mb-1" key={index}>
                                        <div className="d-flex flex-column">
                                            <p><strong>{comment.name}</strong> <span className='text-primary'>wrote:</span></p>
                                            <p style={{ fontStyle: 'italic' }}>{comment.comment}</p>
                                            {
                                                comment.isinterested &&

                                                <span className="text-success">Interested</span>

                                            }
                                        </div>
                                    </li>
                            })}
                        </ul>
                    </>
            }
            <CommContext.Provider value={commValues}>
                <NewComment />
            </CommContext.Provider>
        </div>
    );
};

export default CommentThread;
