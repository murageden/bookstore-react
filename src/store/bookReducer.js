import * as types from './actionTypes';

const initialState = {
    books: [],
    authors: [],
    loading: false,
    error: null
};

export default function bookReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_BOOKS_REQUEST:
        case types.ADD_BOOK_REQUEST:
        case types.FETCH_AUTHORS_REQUEST:
            return { ...state, loading: true, error: null };

        case types.FETCH_BOOKS_SUCCESS:
            return { ...state, loading: false, books: action.payload };

        case types.ADD_BOOK_SUCCESS:
            return { ...state, loading: false, books: [...state.books, action.payload] };

        case types.FETCH_AUTHORS_SUCCESS:
            return { ...state, loading: false, authors: action.payload };


        case types.FETCH_BOOKS_FAILURE:
        case types.ADD_BOOK_FAILURE:
        case types.FETCH_AUTHORS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}
