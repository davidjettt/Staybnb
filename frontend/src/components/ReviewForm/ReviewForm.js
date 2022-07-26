
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { createReviewThunk, editReviewThunk } from '../../store/reviews';
import { Rating } from 'react-simple-star-rating';
import './ReviewForm.css';

export default function ReviewForm({ setShowModal , review, formType }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ reviewInput, setReviewInput ] = useState(review.review);
    const [ rating, setRating ] = useState(0);
    // const [ starsInput, setStarsInput ] = useState(review.stars);
    const [ errors, setErrors ] = useState([]);

    console.log('RATING', rating)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        review = {
            ...review,
            review: reviewInput,
            stars: rating / 20
        }

        if (formType === 'Create Review') {
            await dispatch(createReviewThunk(review))
            .then((res) => {
                if (res) {
                    setShowModal(false);
                        history.push(`/spots/${review.spotId}`);
                        // window.location.reload();
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
        } else {
            await dispatch(editReviewThunk(review))
            .then((res) => {
                if (res) {
                    setShowModal(false);
                        history.push(`/spots/${review.spotId}`);
                        // window.location.reload();
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
        }
    };



    const newRating = (rate) => {
        setRating(rate)

    }
    return (
        <>

            <div className="create-spot-form-container">
                <div className="create-spot-form-pane">
                    <div className="create-spot-form-title-container">
                        <h3 className='create-spot-form-title'>{formType}</h3>
                    </div>
                    <form className='create-spot-form' onSubmit={handleSubmit}>
                        <div className='errors'>
                            <ul className="errors-list">
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                        </div>
                        <div className='input-container-main'>
                            <div className='input-container-sub'>
                                <div className="address-input-container">
                                    <label>
                                        <textarea
                                            cols={60}
                                            rows={10}
                                            className='address-input-field'
                                            type='text'
                                            placeholder='Review'
                                            value={reviewInput}
                                            onChange={(e) => setReviewInput(e.target.value)}
                                            // required
                                        />
                                    </label>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'center'}} >
                                    <Rating
                                        ratingValue={rating}
                                        initialValue={0}
                                        onClick={newRating}
                                        fillColor='gold'
                                        transition={true}
                                    />
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
                                <div className="login-button-container">
                                    <button className='login-button' type='submit'>{formType}</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
