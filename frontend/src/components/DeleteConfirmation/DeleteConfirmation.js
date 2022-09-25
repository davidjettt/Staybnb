import { useDispatch } from "react-redux"
import { deleteBookingThunk } from "../../store/bookings"
import './DeleteConfirmation.css'



export default function DeleteConfirmation({ setShowDelete, bookingId }) {
    const dispatch = useDispatch()

    const handleDelete = () => {
        if (bookingId) {
            dispatch(deleteBookingThunk(bookingId))
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
                    'Are you sure you want to delete? This cannot be undone.'}
                </div>
                <div className="delete-btns">
                    <button className="delete-no" onClick={handleCancel}>No</button>
                    <button className="delete-yes" onClick={handleDelete}>Yes</button>
                </div>
            </div>
        </>
    )
}
