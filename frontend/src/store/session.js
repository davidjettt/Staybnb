import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';


export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}


// Login thunk -- POST
export const login = (user) => async (dispatch) => {
    const { email, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    const data = await response.json();
    dispatch(setUser(data));
    // console.log(response)
    return response;
}

// Restore session user thunk -- GET
export const restoreUserThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');

    const data = await response.json();
    dispatch(setUser(data));
    return response;
}

const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case SET_USER: {
            newState = {...state};
            newState.user = action.payload;
            return newState;
        }
        case REMOVE_USER: {
            newState = {...state};
            newState.user = null;
            return newState;
        }
        default:
            return state;
    }
}
