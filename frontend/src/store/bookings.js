import { csrfFetch } from "./csrf";

const LOAD_BOOKINGS = 'bookings/loadAll'
const CREATE_BOOKING = 'bookings/create'
const UPDATE_BOOKING = 'bookings/update'
const DELETE_BOOKING = 'bookings/delete'


const loadBookings = (bookings) => {
    return {
        type: LOAD_BOOKINGS,
        bookings
    }
}

const createBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

const updateBooking = (booking) => {
    return {
        type: UPDATE_BOOKING,
        booking
    }
}

const deleteBooking = (booking) => {
    return {
        type: DELETE_BOOKING,
        booking
    }
}

export const loadBookingsThunk = () => async (dispatch) => {
    const response = await fetch('/api/bookings')

    if (response.ok) {
        const data = await response.json()
        dispatch(loadBookings(data))
    }
}

export const createBookingThunk = (booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${booking.spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createBooking(data))
        return data
    }
}

export const updateBookingThunk = (booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateBooking(data))
        return data
    }
}

export const deleteBookingThunk = (booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteBooking(booking))
    }
}


const initialState = {}
export default function bookingsReducer(state = initialState, action) {
    let newState
    switch(action.type) {
        case LOAD_BOOKINGS: {
            newState = {}
            action.bookings.forEach((booking) => {
                newState[booking.id] = booking
            })
            return newState
        }
        case CREATE_BOOKING: {
            newState = JSON.parse(JSON.stringify(state))
            newState[action.booking.id] = action.booking
            return newState
        }
        case UPDATE_BOOKING: {
            newState = JSON.parse(JSON.stringify(state))
            newState[action.booking.id] = action.booking
            return newState
        }
        case DELETE_BOOKING: {
            newState = JSON.parse(JSON.stringify(state))
            delete newState[action.booking.id]
            return newState
        }
        default:
            return state
    }
}
