import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SPOTS_BY_USER = 'spots/getSpotsByUser';
const GET_SPOT_DETAILS = 'spots/getSpotDetails';
const CREATE_SPOT = 'spots/createSpot';
const EDIT_SPOT = 'spots/editSpot';
const DELETE_SPOT = 'spots/deleteSpot';
const IMG_UPLOAD_SPOT = 'spots/imageUpload'

export const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    }
}

export const getSpotsByUser = (spots) => {
    return {
        type: GET_SPOTS_BY_USER,
        payload: spots
    }
}

export const getSpotDetails = (spot) => {
    return {
        type: GET_SPOT_DETAILS,
        payload: spot
    }
}

export const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot
    }
}

export const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        payload: spot
    }
}
export const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

const imageUploadSpot = (spot) => {
    return {
        type: IMG_UPLOAD_SPOT,
        spot
    }
}

// GET ALL SPOTS THUNK
export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await fetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllSpots(data))
        return data;
    }
}

// GET ALL SPOTS THAT BELONG TO CURRENT USER
export const getSpotsByUserThunk = () => async (dispatch) => {
    const response = await fetch('/api/your-spots');


    if (response.ok) {
        const data = await response.json();

        dispatch(getSpotsByUser(data));
    }
}

// GET DETAILS OF A SPOT BY ID
export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)
        // .catch(err => console.log(err))


    if (response.ok) {
        const data = await response.json();
        dispatch(getSpotDetails(data));
    }
}

// CREATE A SPOT
export const createSpotThunk = (newSpot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price, previewImage } = newSpot;

    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(createSpot(data));
        return data;
    }
}

// Upload image to a spot
export const uploadSpotImageThunk = (images, spotId) => async (dispatch) => {
    let response
    const formData = new FormData()

    if (images.length < 2) {
        formData.append('image', images[0])
        response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: {'Content-Type': 'multipart/form-data'},
            body: formData
        })
    } else {
        images.forEach((image) => {
            formData.append('images', image)
        })

        response = await csrfFetch(`/api/spots/${spotId}/images/multiple`, {
            method: 'POST',
            headers: {'Content-Type': 'multipart/form-data'},
            body: formData
        })
    }


    if (response.ok) {
        const data = await response.json()
        dispatch(imageUploadSpot(data))
    }
}

// UPDATE A SPOT
export const editSpotThunk = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })
    // .catch(err => console.log('ERROR', err))

    if (response.ok) {
        const data = await response.json();
        dispatch(editSpot(data));
        return data;
    }
}

// DELETE A SPOT THUNK
export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
        dispatch(deleteSpot(spotId));
    }
}

const initialState = {};

export default function spotsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_SPOTS: {
            let newState = {};
            action.payload.spots.forEach((spot) => {
                newState[spot.id] = spot;
            })
            return newState;
        }
        case GET_SPOTS_BY_USER: {
            let newState = {}
            action.payload.spots.forEach((spot) => {
                newState[spot.id] = spot;
            })
            return newState;
        }
        case GET_SPOT_DETAILS: {
            let newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case CREATE_SPOT: {
            let newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case EDIT_SPOT: {
            let newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case DELETE_SPOT: {
            let newState = {...state};
            delete newState[action.spotId];
            return newState;
        }
        case IMG_UPLOAD_SPOT: {
            let newState = {...state}
            newState[action.spot.id] = action.spot
            return newState
        }
        default:
            return state
    }
}
