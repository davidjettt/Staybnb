import { useState } from 'react'
import { Calendar } from 'react-calendar'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import xBtn from '../../images/x-button.svg'
import '../SpotDetail/ReactCalendar.css'
import './EditBookingForm.css'
import { updateBookingThunk } from '../../store/bookings'


export default function EditBookingForm ({ bookingId, setShowEdit }) {
    const dispatch = useDispatch()
    const booking = useSelector(state => state.bookings[+bookingId])
    const startSplit = booking.startDate.split('-')
    const newStart = new Date(startSplit[0], startSplit[1] - 1, startSplit[2])
    const endSplit = booking.endDate.split('-')
    const newEnd = new Date(endSplit[0], endSplit[1] - 1, endSplit[2])

    const [ bookingDates, setBookingDates ] = useState([newStart, newEnd])

    const [ errors, setErrors ] = useState([])

    const handleEditBooking = async () => {
        setErrors([])
        const today = new Date()

        if (!bookingDates) {
            setErrors(['You must select a start and end date!'])
        }
        else if (today > bookingDates[0] || today.getTime() > bookingDates[1].getTime()) {
            setErrors(['You cannot select a day in the past!'])
        }
        else {
            const payload = {
                ...booking,
                startDate: format(bookingDates[0], 'yyyy-MM-dd'),
                endDate: format(bookingDates[1], 'yyyy-MM-dd')
            }

            const bookingData = await dispatch(updateBookingThunk(payload))
                                .catch(
                                    async (res) => {
                                        const data = await res.json()
                                        if (data) {
                                            setErrors([data.message])
                                        }
                                    }
                                )
            if (bookingData) {
                setShowEdit(false)
            }
        }
    }

    const handleXBtn = () => {
        setShowEdit(false)
    }

    return (
        <div className='edit-booking-main'>
            <div className='edit-booking-header-container'>
                <img onClick={handleXBtn} src={xBtn}  alt='x button' />
                <div className='edit-booking-header'>Edit Trip</div>
                <div></div>
            </div>
            <div className='edit-booking-form-container'>
                <div className='booking-errors'>
                    <ul className="booking-errors-list">
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <Calendar
                    // showNavigation={false}
                    selectRange={true}
                    value={bookingDates}
                    onChange={setBookingDates}
                />
                <button className='edit-booking-btn' onClick={handleEditBooking}>Update Trip</button>
            </div>
        </div>
    )
}
