
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReviewThunk, editReviewThunk, getAllReviewsThunk, getReviewsUserThunk } from '../../store/reviews';
import { Rating } from 'react-simple-star-rating';

import { getSpotDetailsThunk } from '../../store/spots';

export default function EditReviewFormModal({ setShowModal , review, formType }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ reviewInput, setReviewInput ] = useState(review.review);
    const [ rating, setRating ] = useState(review.stars * 20);
    const [ errors, setErrors ] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        review = {
            ...review,
            review: reviewInput,
            stars: rating / 20
        }

        if (formType === 'Update Review') {
            await dispatch(editReviewThunk(review))
            .then((res) => {
                if (res) {
                    setShowModal(false);
                }
            })
            .catch(
                async (res) => {
                    // console.log('RES', res)
                    const data = await res.json();
                    // console.log('DATA', data)
                    if (data.errors) {
                        setErrors(data.errors)
                    } else {
                        setErrors([data.message])
                    }
                }
                );
            await dispatch(getReviewsUserThunk());
        }
    };

    const newRating = (rate) => {
        setRating(rate)
    }

    const handleClick = () => {
        setShowModal(false);
    }

    return (
        <>
            <div className="editreview-form-container">
                <div className="edit-review-form-pane">
                    <div className="edit-review-form-title-container">
                        <button onClick={handleClick} className='x-button-update-review'>
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: 16, width: 16, stroke: 'currentcolor', strokeWidth: 3, overflow: 'visible'}}><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
                        </button>
                        <h3 className='edit-review-form-title'>{formType}</h3>
                        <div></div>
                    </div>
                    <form className='edit-review-form' onSubmit={handleSubmit}>
                        <div className='errors'>
                            <ul className="errors-list">
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                        </div>
                        <div className='edit-input-container-main'>
                            <div className='edit-input-container-sub'>
                            <div style={{display: 'flex', justifyContent: 'flex-start'}} >
                                    <Rating
                                        ratingValue={rating}
                                        initialValue={0}
                                        onClick={newRating}
                                        fillColor='gold'
                                        transition={true}
                                    />
                                </div>
                                <div className="edit-review-input-container">
                                    <label>
                                        <textarea
                                            cols={60}
                                            rows={10}

                                            type='text'
                                            placeholder='Add Your Review Here...'
                                            value={reviewInput}
                                            onChange={(e) => setReviewInput(e.target.value)}
                                            // required
                                        />
                                    </label>
                                </div>

                                {/* <div className='city-input-container'>
                                    <label>
                                        <input
                                            className='city-input-field'
                                            type='text'
                                            placeholder='Star rating'
                                            value={starsInput}
                                            onChange={(e) => setStarsInput(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div> */}
                                <div className="modal-update-review-button-container">
                                    <button className='modal-update-review-button' type='submit'>{formType || 'Post Review'}</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
