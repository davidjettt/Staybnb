import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviewThunk, editReviewThunk, getReviewsUserThunk } from '../../store/reviews';
import { Link } from 'react-router-dom';


import './YourReviews.css';
import EditReviewForm from '../EditReviewForm/EditReviewForm';
import DeleteYourReview from './DeleteYourReview';

export default function YourReviews () {
    const [ loadUserReviews, setLoadUserReviews ] = useState(false);
    const dispatch = useDispatch();


    // const userId = useSelector(state => state.session?.userId)
    const userId = useSelector(state => state.session.user?.id)

    const reviews = useSelector((state) => {
        // console.log('REVIEWS STATE', state.reviews)
        if (loadUserReviews) {
            return Object.values(state.reviews);
        } else {
            return {};
        }
    })

    useEffect(() => {

        dispatch(getReviewsUserThunk());
        // console.log('DISPATCH CALLED')
        setLoadUserReviews(true);
        // console.log('STATE VAR CHANGED')
    }, [dispatch])





    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // const handleDeleteReview = async () => {
    //     await dispatch(deleteReviewThunk(userReview));
    //     // await dispatch(get);
    // }


    return (
        <>
        {loadUserReviews && <div className='your-reviews-main'>
            {/* {console.log('PAGE LOADED')} */}
            <div className='your-reviews-heading-container'>
                {/* <h3 className='your-reviews-heading'>{reviews.length ? 'Your Reviews' : 'You Don\'t Have Any Reviews!'}</h3> */}
                <h3 className='your-reviews-heading'>Your Reviews</h3>
            </div>
            <div className='your-reviews-content-container-parent'>
                <div className='your-reviews-content-container'>
                    {reviews.map((review, idx) => (
                        <>
                        {review.userId === userId && <div key={idx} className='your-reviews-page-container'>
                            {/* <Link to={`/spots/${review.spotId}`}>
                                <button className='go-to-spot-button'>Go To Spot</button>
                            </Link> */}


                            <div className='your-reviews-text-content'>
                                <Link className='your-reviews-spot-link' to={`/spots/${review.spotId}`}>
                                    <div className='spot-name-location-container'>
                                        <span style={{textDecoration: 'none', fontWeight: 'bold'}}>{idx + 1}. </span>
                                        <span className='your-review-spot-name'>{review.Spot?.name} • </span>
                                        <span>{review.Spot?.city}, {review.Spot?.state}, {review.Spot?.country}</span>
                                    </div>
                                </Link>
                                <div className='your-reviews-location-buttons-container'>
                                    <div className='your-reviews-modal-date'>{monthNames[new Date(review.createdAt).getMonth()]} {new Date(review.createdAt).getFullYear()}</div>
                                    <div className='your-reviews-edit-delete-buttons-container'>
                                        <EditReviewForm yourReviews={true} reviewId={review.id} />
                                        <DeleteYourReview review={review} />
                                    </div>
                                </div>
                                <div className='your-review-text-container'>
                                    {review.review}
                                </div>
                            </div>
                            {/* {review.Images && <div className='your-reviews-images-container'>
                                {review.Images.map((image, idx) => (
                                    <img className={'your-reviews' + idx} key={idx} src={image.url} />
                                ))}
                            </div>} */}
                        </div>}
                        </>
                    ))}
                </div>
            </div>
        </div>}
        </>
    )
}
