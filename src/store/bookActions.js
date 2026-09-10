import * as types from './actionTypes';


const API_URL_BOOKS = 'http://localhost:8080/api/v1/books';
const API_URL_AUTHORS = 'http://localhost:8080/api/v1/authors'


const getRequestConfig = (method = 'GET', body = null) => {
    const token = localStorage.getItem('userToken');

    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method: method,
        headers: headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    return config;
};

export const fetchAuthors = () => {
    return (dispatch) => {
        dispatch({ type: types.FETCH_AUTHORS_REQUEST });

        fetch(API_URL_AUTHORS, getRequestConfig('GET'))
            .then((response) => {
                if (!response.ok) throw new Error('Could not pull author index data');
                return response.json();
            })
            .then((data) => {
                dispatch({ type: types.FETCH_AUTHORS_SUCCESS, payload: data });
            })
            .catch((error) => {
                dispatch({ type: types.FETCH_AUTHORS_FAILURE, payload: error.message });
            });
    };
};

export const fetchBooks = () => {
    return (dispatch) => {
        dispatch({ type: types.FETCH_BOOKS_REQUEST });
        fetch(API_URL_BOOKS, getRequestConfig('GET'))
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((data) => {
                dispatch({ type: types.FETCH_BOOKS_SUCCESS, payload: data });
            })
            .catch((error) => {
                dispatch({ type: types.FETCH_BOOKS_FAILURE, payload: error.message });
            });
    };
};

// Thunk to add a new book to the database
export const addBook = (bookData, callback) => {
    return (dispatch) => {
        dispatch({ type: types.ADD_BOOK_REQUEST });

        fetch(API_URL_BOOKS, getRequestConfig('POST', bookData))
            .then((response) => {
                if (!response.ok) throw new Error('Failed to create book resource');
                return response.json();
            })
            .then((savedBook) => {
                dispatch({ type: types.ADD_BOOK_SUCCESS, payload: savedBook });
                if (callback) callback();
            })
            .catch((error) => {
                dispatch({ type: types.ADD_BOOK_FAILURE, payload: error.message });
            });
    };
};