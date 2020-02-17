import {
    ADD_BOOK_ERROR,
    ADD_BOOK_LOADING,
    ADD_BOOK_SUCCESS,
    DELETE_BOOK_ERROR,
    DELETE_BOOK_LOADING,
    DELETE_BOOK_SUCCESS,
    EDIT_BOOK_ERROR,
    EDIT_BOOK_LOADING,
    EDIT_BOOK_SUCCESS,
    FETCH_BOOKS_ERROR,
    FETCH_BOOKS_LOADING,
    FETCH_BOOKS_SUCCESS
} from './types';
import axios from 'axios';
import {history} from '../index';

const url = 'http://localhost:3000/api/books';
export const createBookSuccess = (data) => {
    return {
        type: ADD_BOOK_SUCCESS,
        payload: data
    };
};
// CREATE 
export const createBook =(book) => {
    const data = {
        title: book.title,
        author: book.author,
        year: book.year
    };
    return (dispatch) => {
        return axios.post(url, data)
            .then(response =>{
                const id = response.data;

                axios.get(`${url}/${id}`)
                    .then(response => {
                        dispatch(createBookSuccess(response.data));
                        history.push('/');
                    }).catch(error=>{
                        console.log(error);
                    })
            }).catch(error=>{
                console.log(error);
            })
    }
}
export const fetchBooksLoading = (data) =>{
    return {
        type: FETCH_BOOKS_LOADING,
        payload: data
    };
};
export const fetchBookError = (data) => {
    return {
        type: FETCH_BOOKS_ERROR,
        payload: data
    };
};
export const fetchBooksSuccess = (data) =>{
    return {
        type: FETCH_BOOKS_SUCCESS,
        payload: data,
    }
};
const normalizeResponse =  (data) => {
    const arr = data.map(item =>{
        const keys = Object.keys(item);
        keys.forEach(k=>{
            item[k.toLowerCase()] = item[k];
        });
        return item;
    });
    console.log(arr);
    return arr;
}
export const fetchBooks = () => {
    let isLoading = true;
    return (dispatch) => {
        dispatch(fetchBooksLoading(isLoading));
        return axios.get(url)
            .then(response=>{
                const data = normalizeResponse(response.data);
                dispatch(fetchBooksSuccess(data));
                isLoading = false;
                dispatch(fetchBooksLoading(isLoading));
            }).catch(error => {
                const errorPayload = {};
                errorPayload['message'] = error.response.data.message;
                errorPayload['status'] = error.response.status;
                dispatch(fetchBookError(errorPayload));
                isLoading =false;
                dispatch(fetchBooksLoading(isLoading));
            })
    };
}