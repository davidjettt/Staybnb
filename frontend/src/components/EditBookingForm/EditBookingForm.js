import { useState, useEffect } from 'react'
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
    const spot = useSelector(state => state.spots[+booking.spotId])
    const startSplit = booking.startDate.split('-')
    const newStart = new Date(startSplit[0], startSplit[1] - 1, startSplit[2])
    const endSplit = booking.endDate.split('-')
    const newEnd = new Date(endSplit[0], endSplit[1] - 1, endSplit[2])
    const [ numNights, setNumNights ] = useState(0)
    const [ bookingDates, setBookingDates ] = useState([newStart, newEnd])
    const [ firstRender, setFirstRender ] = useState(true)
    const [ errors, setErrors ] = useState([])

    useEffect(() => {
        if (bookingDates && firstRender) {
            const start = new Date(bookingDates[0])
            const end = new Date(bookingDates[1])
            const oneDay = 1000 * 60 * 60 * 24

            const diffInTime = end.getTime() - start.getTime()

            const diffInDays = Math.round(diffInTime / oneDay)

            setNumNights(diffInDays)
            setFirstRender(false)
        } else if (bookingDates) {
            const start = new Date(bookingDates[0])
            const end = new Date(bookingDates[1])
            const oneDay = 1000 * 60 * 60 * 24

            const diffInTime = end.getTime() - start.getTime()

            const diffInDays = Math.round(diffInTime / oneDay) - 1

            setNumNights(diffInDays)
        }
    }, [bookingDates])

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
        <>
            <div className='edit-booking-main'>
                <div className='edit-booking-header-container'>
                    <img onClick={handleXBtn} src={xBtn}  alt='x button' />
                    <div className='edit-booking-header'>Edit Trip</div>
                    <div className='edit-booking-price'>
                        <span style={{fontWeight: 550}} >${spot.pricePerNight} </span>
                        <div>night</div>
                    </div>
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
                        minDate={new Date()}
                        minDetail='year'
                    />
                    <div className='edit-booking-prices'>
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
                    <button className='edit-booking-btn' onClick={handleEditBooking}>Update Trip</button>
                </div>
            </div>
        </>
    )
}
