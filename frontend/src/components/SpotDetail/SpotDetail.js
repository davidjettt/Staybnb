import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SpotReviews from '../SpotReviews/SpotReviews';
import CreateReviewForm from '../CreateReviewForm/CreateReviewForm';
import ReviewsModal from '../ReviewsModal/ReviewsModal';
import './SpotDetail.css';
import smallBlackStar from '../../images/small-black-star.svg'
import { HiStar } from 'react-icons/hi';
import Calendar from 'react-calendar';
import './ReactCalendar.css'
import { useEffect, useState } from 'react';
import { format } from 'date-fns'
import { createBookingThunk, loadBookingsThunk } from '../../store/bookings';
import Footer from '../Footer/Footer';
import { Modal } from '../../context/Modal';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import SpotMap from '../SpotMap/SpotMap';
import SpotImagesModal from './SpotImagesModal';
import LoginForm from '../LoginFormModal/LoginForm'

export default function SpotDetail() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spots[+spotId])
    const user = useSelector(state => state.session.user);
    const spotReviews = useSelector(state => Object.values(state.reviews)?.filter(review => +review.spotId === +spotId))
    const [ bookingDate, setBookingDate ] = useState(null)
    const [ numNights, setNumNights ] = useState(0)
    const [ errors, setErrors ] = useState([])
    const [ showLoginModal, setShowLoginModal ] = useState(false)
    const [ showDelete, setShowDelete ] = useState(false)
    const [ showImagesModal, setShowImagesModal ] = useState(false)

    const handleShowDeleteModal = () => {
        setShowDelete(true)
    }

    useEffect(() => {
        if (bookingDate) {
            const start = new Date(bookingDate[0])
            const end = new Date(bookingDate[1])
            const oneDay = 1000 * 60 * 60 * 24

            const diffInTime = end.getTime() - start.getTime()

            const diffInDays = Math.round(diffInTime / oneDay) - 1

            setNumNights(diffInDays)
        }
    }, [bookingDate])


    let numReviews
    let avgRating
    if (spotReviews) {
        numReviews = spotReviews.length
        avgRating = spotReviews.reduce((acc, review) => {
            return acc + review.stars
        }, 0) / numReviews
    }

    // const autoScroll = () => {
    //     document.querySelector(".reviews-container").scrollIntoView({behavior: 'smooth' });
    // }

    const handleBooking = async () => {
        setErrors([])
        const today = new Date()
        if (!user) {
            // window.alert('You must be logged in to reserve!')
            setShowLoginModal(true)
        }
        else if (+user.id === +spot.ownerId) {
            setErrors(['You cannot book your own spot!'])
        }
        else {
            if (!bookingDate) {
                setErrors(['You must select a start and end date!'])
            }
            else if (numNights < 2) {
                setErrors(['Two night minimum to reserve'])
            }
            else if (today.getTime() > bookingDate[0].getTime() || today.getTime() > bookingDate[1].getTime()) {
                // setErrors(['You cannot select a day in the past!'])
                setErrors(['You cannot select today as your start date!'])
            }
            else {
                const payload = {
                    startDate: format(bookingDate[0], 'yyyy-MM-dd'),
                    endDate: format(bookingDate[1], 'yyyy-MM-dd'),
                    spotId: spotId,
                    userId: user.id
                }

                const bookingData = await dispatch(createBookingThunk(payload))
                            .catch(
                                async (res) => {
                                    const data = await res.json()
                                    if (data) {
                                        // setErrors(Object.values(data.errors))
                                        setErrors([data.message])
                                    }
                                }
                            )
                if (bookingData) {
                    await dispatch(loadBookingsThunk())
                    history.push('/your-bookings')
                    // setBookingDate(null)
                }
            }
        }
    }


    return (
        <>
            <div className='spot-details-main'>
                {spot && <div className='spot-details-main-container'>
                            <header className='spot-details-header-container'>
                                <div className='spot-name-container'>
                                    <h1 className='spot-title'>{spot.name}</h1>
                                </div>
                                <div className='spot-details-container'>
                                    <div className='star-rating-location'>
                                        <HiStar className='star' />
                                        <span className='rating-number'>{avgRating ? avgRating?.toFixed(2) : null}  • </span>
                                        <ReviewsModal spotId={spotId} numReviews={numReviews} avgRating={avgRating} />
                                        <span>  · {spot.city}, {spot.state}, {spot.country} </span>
                                    </div>
                                    <div className='spot-links-container'>
                                        {user?.id === spot.ownerId ? <Link  to={`/spots/${spotId}/edit`}>
                                            <button className='edit-spot-button'>Edit Spot</button>
                                        </Link> : null}
                                        {user?.id === spot.ownerId ? <button className='delete-spot-button' onClick={handleShowDeleteModal}>
                                            Delete Spot
                                        </button> : null}
                                        {showDelete && <Modal onClose={() => setShowDelete(false)}>
                                            <DeleteConfirmation spotId={spot.id} setShowDelete={setShowDelete} />
                                        </Modal>}
                                    </div>
                                </div>
                            </header>
                            <div className='spot-images-container'>
                                {spot.Images?.length && spot.Images.map((image, idx) => (
                                    <>
                                        <img style={{cursor: 'pointer'}} key={idx} className={'key' + idx} src={`${image.url}`} onClick={() => setShowImagesModal(true)} />
                                    </>
                                ))}
                            <SpotImagesModal showImagesModal={showImagesModal} setShowImagesModal={setShowImagesModal} images={spot.Images} />
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
                                                    {/* <HiStar /> */}
                                                    <img style={{width: 11, marginRight: 3}} src={smallBlackStar} alt='black star'/>
                                                </span>
                                                <span>{avgRating ? avgRating?.toFixed(2) : null} ᛫ </span>
                                                <span style={{marginLeft: 2}} >{numReviews} reviews</span>
                                            </div>
                                        </div>
                                        <div className='bookings-form-container'>
                                            <div className='booking-errors'>
                                                <ul className="booking-errors-list">
                                                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                                                </ul>
                                            </div>
                                            <Calendar
                                                selectRange={true}
                                                value={bookingDate}
                                                onChange={setBookingDate}
                                                minDate={new Date()}
                                                minDetail='year'
                                            />
                                            <button className='booking-button' onClick={handleBooking}>Reserve</button>
                                        </div>
                                        {numNights > 0 && <div className='price-night-container'>
                                            <div className='price-night'>${`${spot.pricePerNight} x ${numNights} nights`}</div>
                                            <div className='total-cost'>${spot.pricePerNight * numNights}</div>
                                        </div>}
                                        <div className='service-fee-container'>
                                            <div className='service-fee'>Service fee</div>
                                            <div className='service-fee-cost'>$100</div>
                                        </div>
                                        <div className='price-card-line'></div>
                                        <div className='total-cost-container'>
                                            <div className='total-cost-text'>Total before taxes</div>
                                            <div className='total-cost'>${spot.pricePerNight * numNights + 100}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='reviews-container'>
                                <SpotReviews numReviews={numReviews} avgRating={avgRating} spotId={spotId} />
                                {user && user.id !== spot.ownerId && <CreateReviewForm spotId={spotId} />}
                            </div>
                            <SpotMap spot={spot} />
                        </div>}
            </div>
            <Footer />
            {showLoginModal &&
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginForm setShowModal={setShowLoginModal} />
                </Modal>}
        </>
    )
}
