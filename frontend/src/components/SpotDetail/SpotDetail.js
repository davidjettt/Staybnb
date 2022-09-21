import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SpotReviews from '../SpotReviews/SpotReviews';
import CreateReviewForm from '../CreateReviewForm/CreateReviewForm';
import ReviewsModal from '../ReviewsModal/ReviewsModal';
import { deleteSpotThunk } from '../../store/spots';
import './SpotDetail.css';
import { HiStar } from 'react-icons/hi';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import './ReactCalendar.css'
import { useState } from 'react';


export default function SpotDetail() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spots[+spotId])
    const user = useSelector(state => state.session.user);
    const spotReviews = useSelector(state => Object.values(state.reviews)?.filter(review => +review.spotId === +spotId))
    const [ bookingDate, setBookingDate ] = useState(null)

    console.log('START', bookingDate)

    let numReviews
    let avgRating
    if (spotReviews) {
        numReviews = spotReviews.length
        avgRating = spotReviews.reduce((acc, review) => {
            return acc + review.stars
        }, 0) / numReviews
    }

    const handleDelete = async () => {
        await dispatch(deleteSpotThunk(spotId));
        history.push('/');
    }

    // const autoScroll = () => {
    //     document.querySelector(".reviews-container").scrollIntoView({behavior: 'smooth' });
    // }
    // let avgRating
    // let numReviews

    // if (spot.Reviews) {
    //     avgRating = spot.Reviews.reduce((acc, review) => {
    //         return acc + review.stars
    //     }, 0) / spot.Reviews.length

    //     numReviews = spot.Reviews.length
    // }

    const handleBooking = () => {

    }


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
                                    <span className='rating-number'>{spot.avgRating ? spot.avgRating?.toFixed(2) : null}  • </span>
                                    {/* {spot.numReviews ? <span className='review-click' onClick={test}>{spot.numReviews} reviews</span> : <span>new spot </span>} */}
                                    <ReviewsModal spotId={spotId} numReviews={numReviews} avgRating={avgRating} />
                                    <span>  · {spot.city}, {spot.state}, {spot.country} </span>
                                </div>
                                <div className='spot-links-container'>
                                    {user.id === spot.ownerId ? <Link  to={`/spots/${spotId}/edit`}>
                                        <button className='edit-spot-button'>Edit Spot</button>
                                    </Link> : null}
                                    {user.id === spot.ownerId ? <button className='delete-spot-button' onClick={handleDelete}>
                                        Delete Spot
                                    </button> : null}
                                </div>
                            </div>
                        </header>
                        <div className='spot-images-container'>
                            {spot.Images?.length ? spot.Images.map((image, idx) => (
                                    <img key={idx} className={'key' + idx} src={`${image.url}`} />
                            )) : <img className='key0' src={spot.previewImage} />}
                        </div>
                        <div className='spot-details-subtitle-description-container'>
                            <div className='subtitle-container'>
                                    <h2 className='subtitle'>{spot.name} hosted by {user?.firstName} {user?.lastName}</h2>
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
                                            <span>{avgRating ? avgRating?.toFixed(2) : null} ᛫ </span>
                                            <span>{numReviews} reviews</span>
                                        </div>
                                    </div>
                                    <div className='bookings-form-container'>
                                        <Calendar
                                            // showNavigation={false}
                                            selectRange={true}
                                            value={bookingDate}
                                            onChange={setBookingDate}
                                        />
                                        <button className='booking-button' onClick={handleBooking}>Reserve</button>
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
                            {user && user.id !== spot.ownerId && <CreateReviewForm spotId={spotId} />}
                        </div>
                    </div>}
        </div>
    )
}
