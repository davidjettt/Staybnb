

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './YourBookings.css'
import travelFriends from '../../images/travel-friends.webp'
import wavingHand from '../../images/waving-hand.svg'


export default function YourBookings() {

    const sessionUser = useSelector(state => state.session.user)

    const allBookings = useSelector(state => Object.values(state.bookings)
                        .filter(booking => +booking.userId === +sessionUser?.id))

    const today = new Date()

    const upcomingBookings = allBookings.filter((booking) => {
        const dateSplit = booking.endDate.split('-')
        const newFormat = new Date (dateSplit[0], dateSplit[1] - 1, dateSplit[2])
        return today.getTime() < newFormat.getTime()
        // return booking.startDate
    })

    const pastBookings = allBookings.filter(booking => {
        const dateSplit = booking.endDate.split('-')
        const newFormat = new Date (dateSplit[0], dateSplit[1] - 1, dateSplit[2])
        return today.getTime() > newFormat.getTime()
    })

    console.log('UPCOMING', upcomingBookings)
    console.log('PAST', pastBookings)


    return (
        <>
            <div className='your-bookings-main'>
                <div className='your-bookings-header-container'>
                    Trips
                </div>
                <div className='your-bookings-upcoming-container'>
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
                            <img className='travel-friends' src={travelFriends} alt='travel-friends' />
                        </div>
                    </div>
                </div>
                <div className='your-bookings-been-container'>

                </div>
            </div>
        </>
    )
}
