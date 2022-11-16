import { authActions } from "../constants"

export const login = () => {
    return {
        type: authActions.LOGIN
    }
}

export const loginSuccess = (data) => {
    return {
        type: authActions.LOGIN_SUCCESS,
        payload: data
    }
}

export const loginInvalid = (data) => {
    return {
        type: authActions.LOGIN_INVALID,
        payload: data
    }
}

export const loginError = (error) => {
    return {
        type: authActions.LOGIN_ERROR,
        payload: error
    }
}

export const clearLoginError = () => {
    return {
        type: authActions.CLEAR_LOGIN_ERROR
    }
}

export const logoutSuccess = () => {
    return {
        type: authActions.LOGOUT_SUCCESS,
    }
}

export const register = () => {
    return {
        type: authActions.REGISTER_USER
    }
}

export const registerSuccess = (data) => {
    return {
        type: authActions.REGISTER_USER_SUCCESS,
        payload: data
    }
}

export const registerError = (error) => {
    return {
        type: authActions.REGISTER_USER_ERROR,
        payload: error
    }
}
export const notesList = () => {
    return {
        type: authActions.NOTES_LISTING
    }
}

export const notesListSuccess = (data) => {
    return {
        type: authActions.NOTES_LISTING_SUCCESS,
        payload: data
    }
}

export const notesListError = (error) => {
    return {
        type: authActions.NOTES_LISTING_ERROR,
        payload: error
    }
}