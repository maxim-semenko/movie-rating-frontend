import * as types from "./FilmActionType"

const initialState = {
    films: [],
    film: {},
    loading: true,
    currentPage: 1,
    sizePage: 9,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
    successCreated: false,
}

const filmReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_FILMS:
            return {
                ...state,
                films: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                numberOfElements: action.payload.numberOfElements,
                loading: false,
            }
        case types.GET_FILM:
            return {
                ...state,
                film: action.payload,
                loading: false,
            }
        case types.DELETE_FILM_BY_ID:
            return {
                ...state,
                loading: false,
            }
        case types.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case types.SET_SIZE_PAGE:
            return {
                ...state,
                sizePage: action.payload
            }
        case types.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case types.SET_SUCCESS_CREATED:
            return {
                ...state,
                successCreated: action.payload
            }
        default:
            return state
    }
}

export default filmReducers;