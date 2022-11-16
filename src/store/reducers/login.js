import { authActions } from "../constants"

const initialState = {
    loading: false,
    error: "",
    data: "",
    invalidCredential: "",
    registerUserLoading: false,
    registerUserData: "",
    registerUserError: "",
    notesLoading: false,
    notesData: [],
    notesError: "",
}

export const login = (state = initialState, action) => {
    switch (action.type) {
        case authActions.LOGIN:
            return {
                ...state,
                loading: true,
                data: "",
                error: "",
                invalidCredential: ""
            }
        case authActions.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: "",
                invalidCredential: ""
            }
        case authActions.LOGIN_INVALID:
            return {
                ...state,
                loading: false,
                data: "",
                error: "",
                invalidCredential: action.payload
            }
        case authActions.LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                data: "",
                error: action.payload
            }
        case authActions.CLEAR_LOGIN_ERROR:
            return {
                ...state,
                error: "",
                invalidCredential: "",
            }
        case authActions.LOGOUT_SUCCESS:
            return {
                ...state,
                error: "",
                data: "",
                invalidCredential: ""
            }
        case authActions.REGISTER_USER:
            return {
                ...state,
                registerUserLoading: true,
                registerUserData: "",
                registerUserError: ""
            }
        case authActions.REGISTER_USER_SUCCESS:
            return {
                ...state,
                registerUserLoading: false,
                registerUserData: action.payload,
                registerUserError: ""
            }
        case authActions.REGISTER_USER_ERROR:
            return {
                ...state,
                registerUserLoading: false,
                registerUserData: "",
                registerUserError: action.payload,
            }
        case authActions.NOTES_LISTING:
            return {
                ...state,
                notesLoading: true,
                notesData: "",
                notesError: ""
            }
        case authActions.NOTES_LISTING_SUCCESS:
            return {
                ...state,
                notesLoading: false,
                notesData: action.payload,
                notesError: ""
            }
        case authActions.NOTES_LISTING_ERROR:
            return {
                ...state,
                notesLoading: false,
                notesData: "",
                notesError: action.payload,
            }
        default:
            return state
    }
}