import { Modal } from '../../context/Modal'
import { useState } from 'react'
import EditBookingForm from '../EditBookingForm/EditBookingForm'
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation'



export default function EditDeleteBooking({ bookingId }) {
    const [ showEdit, setShowEdit ] = useState(false)
    const [ showDelete, setShowDelete ] = useState(false)

    const handleEditModal = () => {
        setShowEdit(true)
    }

    const handleDeleteModal = () => {
        setShowDelete(true)
    }

    return (
        <>
            {/* <div className='edit-delete-booking-btns'> */}
                <button onClick={handleEditModal} className='edit-trip'>Edit Trip</button>
                <button onClick={handleDeleteModal} className='delete-trip'>Cancel Trip</button>
                {showEdit && <Modal onClose={() => setShowEdit(false)}>
                    <EditBookingForm bookingId={bookingId} setShowEdit={setShowEdit}  />
                </Modal>}
                {showDelete && <Modal onClose={() => setShowDelete(false)}>
                    <DeleteConfirmation bookingId={bookingId} setShowDelete={setShowDelete}  />
                </Modal>}
            {/* </div> */}
        </>
    )
}
