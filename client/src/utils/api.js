const BASE_URL = process.env.REACT_APP_API_BASE_URL+ "/api/v1/"

export const API_GET_BOOKS = BASE_URL + "books"
export const API_CHECKOUT = BASE_URL + "books/checkout"
export const API_CART = BASE_URL + "books/cart"
export const API_LIBRARY = BASE_URL + "books/library"
export const API_LOGIN = BASE_URL +"auth/login"
export const API_REGISTER = BASE_URL +"auth/register"
export const API_LOGOUT = BASE_URL +"auth/logout"