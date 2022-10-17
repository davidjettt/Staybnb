import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteBookingThunk, loadBookingsThunk } from "../../store/bookings"
import { deleteReviewThunk, loadReviewsThunk } from "../../store/reviews"
import { deleteSpotThunk } from "../../store/spots"
import './DeleteConfirmation.css'



export default function DeleteConfirmation({ setShowDelete, bookingId, spotId, review }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [ errors, setErrors ] = useState([])

    const handleDelete = async () => {
        if (bookingId) {
            dispatch(deleteBookingThunk(bookingId))
            .then((res) => {
                if (res) setShowDelete(false)
            })
            .catch( async (res) => {
                const data = await res.json()
                if (data && data.message) setErrors([data.message])
            })
            // setShowDelete(false)
        }
        else if (spotId) {
            await dispatch(deleteSpotThunk(spotId))
            await dispatch(loadBookingsThunk())
            await dispatch(loadReviewsThunk())
            history.push('/')
        }
        else if (review) {
            await dispatch(deleteReviewThunk(review))
            setShowDelete(false)
        }
    }

    const handleCancel = () => {
        setShowDelete(false)
    }

    return (
        <>
            <div className="delete-main">
                <div className="delete-message">
                    {bookingId ? 'Are you sure you want to cancel this trip? This cannot be undone.' :
                    'Are you sure you want to delete? This action cannot be undone.'}
                </div>
                <div className='booking-errors'>
                        <ul className="booking-errors-list">
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    </div>
                <div className="delete-btns">
                    <button className="delete-no" onClick={handleCancel}>Cancel</button>
                    <button className="delete-yes" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </>
    )
}
