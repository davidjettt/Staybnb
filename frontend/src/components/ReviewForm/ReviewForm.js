import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReviewThunk, getAllReviewsThunk } from '../../store/reviews';
import { Rating } from 'react-simple-star-rating';
import { getSpotDetailsThunk } from '../../store/spots';
import './ReviewForm.css';

export default function ReviewForm({ review, formType }) {
    const dispatch = useDispatch();

    const [ reviewInput, setReviewInput ] = useState(review.review);
    const [ rating, setRating ] = useState(review.stars * 20);
    // const [ starsInput, setStarsInput ] = useState(review.stars);
    const [ errors, setErrors ] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        review = {
            ...review,
            review: reviewInput,
            stars: rating / 20
        }

        if (formType === 'Post Review') {
            await dispatch(createReviewThunk(review))
            // .then((res) => {
            //     if (res) {
            //         setShowModal(false);
            //         history.push(`/spots/${review.spotId}`);
            //             // window.location.reload();
            //     }
            // })
            .then((res) => {
                if (res) {
                    setRating(0);
                    setReviewInput('');
                }
            })
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data.errors) {
                        setErrors(data.errors)
                    } else {
                        setErrors([data.message])
                    }
                }
                );
                await dispatch(getAllReviewsThunk(review.spotId));
                await dispatch(getSpotDetailsThunk(review.spotId));
        }
    };

    const newRating = (rate) => {
        setRating(rate)

    }
    return (
        <>
            <div className="review-form-container">
                <div className="review-form-pane">
                    <form className='review-form' onSubmit={handleSubmit}>
                        <div className='post-review-title-errors-container'>
                            <div className="review-form-title-container">
                                <h3 className='review-form-title'>{formType}</h3>
                            </div>
                            <div className='review-post-errors'>
                                <ul className="review-post-errors-list">
                                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                                </ul>
                            </div>
                        </div>
                        <div className='review-input-container-main'>
                            <div className='review-input-container-sub'>
                            <div style={{display: 'flex', justifyContent: 'flex-start'}} >
                                    <Rating
                                        ratingValue={rating}
                                        initialValue={0}
                                        onClick={newRating}
                                        fillColor='gold'
                                        transition={true}
                                    />
                                </div>
                                <div className="review-input-container">
                                    <label>
                                        <textarea
                                            cols={60}
                                            rows={10}
                                            type='text'
                                            placeholder='Add Your Review Here...'
                                            value={reviewInput}
                                            onChange={(e) => setReviewInput(e.target.value)}
                                            required
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
                                <div className="post-review-button-container">
                                    <button className='post-review-button' type='submit'>{formType || 'Post Review'}</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
