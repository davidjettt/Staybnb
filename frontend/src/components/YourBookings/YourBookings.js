import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './YourBookings.css'
import travelFriends from '../../images/travel-friends.webp'
import livingRoom from '../../images/girls-living-room.webp'
import wavingHand from '../../images/waving-hand.svg'
import { format } from 'date-fns'
import EditDeleteBooking from './EditDeleteBooking'


export default function YourBookings() {
    const sessionUser = useSelector(state => state.session.user)
    const allBookings = useSelector(state => Object.values(state.bookings)
                        .filter(booking => +booking.userId === +sessionUser?.id))

    const today = new Date()

    const upcomingBookings = allBookings.filter((booking) => {
        const dateSplit = booking.endDate.split('-')
        const newFormat = new Date (dateSplit[0], dateSplit[1] - 1, dateSplit[2])
        return today.getTime() < newFormat.getTime()
    })

    const pastBookings = allBookings.filter(booking => {
        const dateSplit = booking.endDate.split('-')
        const newFormat = new Date (dateSplit[0], dateSplit[1] - 1, dateSplit[2])
        return today.getTime() > newFormat.getTime()
    })

    const upcomingFormatted = []

    for (let i = 0; i < upcomingBookings.length; i++) {
        const booking = upcomingBookings[i]
        const startSplit = booking.startDate.split('-')
        const endSplit = booking.endDate.split('-')
        const newStart = new Date(startSplit[0], startSplit[1] - 1, startSplit[2])
        const newEnd = new Date(endSplit[0], endSplit[1] - 1, endSplit[2])
        upcomingFormatted.push([newStart, newEnd])
    }

    const pastFormatted = []

    for (let i = 0; i < pastBookings.length; i++) {
        const booking = pastBookings[i]
        const startSplit = booking.startDate.split('-')
        const endSplit = booking.endDate.split('-')
        const newStart = new Date(startSplit[0], startSplit[1] - 1, startSplit[2])
        const newEnd = new Date(endSplit[0], endSplit[1] - 1, endSplit[2])
        pastFormatted.push([newStart, newEnd])
    }

    return (
        <>
            <div className='your-bookings-main'>
                <div className='your-bookings-header-container'>
                    Trips
                </div>
                <div className='your-bookings-upcoming-container'>
                    {!upcomingBookings.length &&
                    <div className='no-bookings-container'>
                        <div className='no-bookings-right'>
                            <div className='waving-hand-container'>
                                <img src={wavingHand} alt='waving-hand'/>
                            </div>
                            <div className='no-bookings-title'>
                                No trips booked...yet!
                            </div>
                            <div className='no-bookings-description'>
                                Time to dust off your bags and start planning your next adventure
                            </div>
                            <div className='back-to-spots'>
                                <Link to='/'>
                                    Start searching
                                </Link>
                            </div>
                        </div>
                        <div className='no-bookings-left'>
                            <img className='travel-friends' src={livingRoom} alt='travel-friends' />
                        </div>
                    </div>}
                    {upcomingBookings.length > 0 && <div className='yes-bookings-title'>
                        Upcoming
                    </div>}
                    {upcomingBookings.length > 0 && <div className='yes-bookings-container'>
                        {upcomingBookings.map((booking, idx) => (
                            <div className='upcoming-bookings' key={idx}>
                                <div className='yes-bookings-left'>
                                    <EditDeleteBooking bookingId={booking.id} />
                                    <Link to={`/spots/${booking.spotId}`} className='booking-city'>
                                        {booking.Spot?.city}
                                    </Link>
                                    <div className='booking-startdate'>

                                        Start Date: {format(new Date(upcomingFormatted[idx][0]), 'LLLL d, yyyy')}

                                    </div>
                                    <div className='booking-endDate'>
                                        End Date: {format(new Date(upcomingFormatted[idx][1]), 'LLLL d, yyyy')}
                                    </div>
                                </div>
                                <div className='yes-bookings-right'>
                                    <img className='booking-preview' src={booking.Spot?.previewImage} alt='preview' />
                                </div>
                            </div>
                        ))}
                    </div>}
                </div>
                <div className='your-bookings-been-container'>
                    <div className='been-title'>
                        Where you've been
                    </div>
                    <div className='been-main'>
                        {pastBookings.map((booking, idx) => (
                            <div className='been-sub' key={idx}>
                                <div className='been-left'>
                                    <div className='been-image'>
                                        <img src={booking.Spot.previewImage} alt='' />
                                    </div>
                                </div>
                                <div className='been-right'>
                                    <div className='been-city'>
                                        {booking.Spot.city}
                                    </div>
                                    <div className='been-host'>
                                        Hosted by {booking.Spot.Owner?.firstName} {booking.Spot.Owner?.lastName}
                                    </div>
                                    <div className='been-date'>
                                        <div>{format(new Date(pastFormatted[idx][0]), 'LLL d, yyyy')}-</div>
                                        <div>{format(new Date(pastFormatted[idx][1]), 'LLL d, yyyy')}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
