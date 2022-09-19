import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import SpotReviews from '../SpotReviews/SpotReviews';
import CreateReviewForm from '../CreateReviewForm/CreateReviewForm';
import ReviewsModal from '../ReviewsModal/ReviewsModal';
import { deleteSpotThunk } from '../../store/spots';
import './SpotDetail.css';
import { HiStar } from 'react-icons/hi';


export default function SpotDetail() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [ render, setRendered ] = useState(false);
    const spot = useSelector(state => state.spots[+spotId])
    const user = useSelector(state => state.session.user?.id);

    const handleDelete = async () => {
        await dispatch(deleteSpotThunk(spotId));
        history.push('/');
    }

    // const autoScroll = () => {
    //     document.querySelector(".reviews-container").scrollIntoView({behavior: 'smooth' });
    // }

    const avgRating = spot.Reviews.reduce((acc, review) => {
        return acc + review.stars
    }, 0) / spot.Reviews.length

    const numReviews = spot.Reviews.length

    return (
        <div className='spot-details-main'>
            {spot && <div className='spot-details-main-container'>
                        <header className='spot-details-header-container'>
                            <div className='spot-name-container'>
                                <h1 className='spot-title'>{spot.name}</h1>
                            </div>
                            <div className='spot-details-container'>
                                <div className='star-rating-location'>
                                    <HiStar className='star' />
                                    <span className='rating-number'>{(spot.avgStarRating?.toFixed(2))}  • </span>
                                    {/* {spot.numReviews ? <span className='review-click' onClick={test}>{spot.numReviews} reviews</span> : <span>new spot </span>} */}
                                    <ReviewsModal spotId={spotId} numReviews={numReviews} avgRating={avgRating} />
                                    <span>  · {spot.city}, {spot.state}, {spot.country} </span>
                                </div>
                                <div className='spot-links-container'>
                                    {user === spot.ownerId ? <Link  to={`/spots/${spotId}/edit`}>
                                        <button className='edit-spot-button'>Edit Spot</button>
                                    </Link> : null}
                                    {user === spot.ownerId ? <button className='delete-spot-button' onClick={handleDelete}>
                                        Delete Spot
                                    </button> : null}
                                </div>
                            </div>
                        </header>
                        <div className='spot-images-container'>
                            {spot.Images?.length ? spot.Images.map((image, idx) => (
                                    <img key={idx} className={'key' + idx} style={{}} src={`${image.url}`} />
                            )) : <img className='key0' src={spot.previewImage} />}
                        </div>
                        <div className='spot-details-subtitle-description-container'>
                            <div className='subtitle-container'>
                                    <h2 className='subtitle'>{spot.name} hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
                                <div className='description-container'>
                                    <div className='description-content'>
                                        {spot.description}
                                    </div>
                                </div>
                            </div>
                            <div className='price-card-container'>
                                <div className='price-card'>
                                    <div className='price-reviews-container'>
                                        <div>
                                            <span className='price-per-night-text'>${`${spot.pricePerNight}`} </span>
                                            <span className='night-text'>night</span>
                                        </div>
                                        <div className='price-card-reviews-container'>
                                            {/* <div>
                                                {spot.avgStarRating?.toFixed(2)}
                                            </div> */}
                                            <span>
                                                <HiStar />
                                            </span>
                                            <span>{spot.avgStarRating?.toFixed(2)} ᛫ </span>
                                            <span>{spot?.numReviews} reviews</span>
                                        </div>
                                    </div>
                                    <div className='bookings-form'>
                                    </div>
                                    <div className='price-night-container'>
                                        <div className='price-night'>${`${spot.pricePerNight} x 5 nights`}</div>
                                        <div className='total-cost'>${spot.pricePerNight * 5}</div>
                                    </div>
                                    <div className='service-fee-container'>
                                        <div className='service-fee'>Service fee</div>
                                        <div className='service-fee-cost'>$100</div>
                                    </div>
                                    <div className='price-card-line'></div>
                                    <div className='total-cost-container'>
                                        <div className='total-cost-text'>Total before taxes</div>
                                        <div className='total-cost'>${spot.pricePerNight * 5 + 100}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='reviews-container'>
                            <SpotReviews numReviews={numReviews} avgRating={avgRating} spotId={spotId} />
                            {user && user !== spot.ownerId && <CreateReviewForm setRendered={setRendered} spotId={spotId} />}
                        </div>
                    </div>}
        </div>
    )
}
