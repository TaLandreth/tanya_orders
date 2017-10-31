import axios from "axios";

const BASE_URL = "http://localhost:5000/api"
var AXIOS_CONFIG = { headers: { 'Authorization': '' } }

export function onLogin(user, dispatch) {
    dispatch({
        type: "LOGIN_STARTED"
    })
    axios.post(BASE_URL + "/login", {
        username: user.username,
        password: user.password}, )

        .then((response) => {
            //Set the header to be used for future authentication --> not utilized... yet?
            AXIOS_CONFIG.headers.Authorization = response.data.id
            dispatch({ type: "LOGIN_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "LOGIN_FAILED", payload: err })
        })
}

//RETRIEVE PRODUCTS
export function getProducts(dispatch, instructions) {
    dispatch({
        type: "GET_PRODUCTS_STARTED"
    })
    axios.post(BASE_URL + "/products", instructions)
        .then((response) => {
            //console.log("Size of data: " + response.data.length)
            dispatch({ type: "GET_PRODUCTS_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}

//VIEW A PRODUCT
export function viewProduct(dispatch, product) {
    dispatch({
        type: "VIEW_PRODUCT_STARTED"
    })

    console.log(product)
    dispatch({ type: "VIEW_PRODUCT_FINISHED", payload: product })
}

//RETRIEVE ORDERS - 
export function getOrders(dispatch, instructions) {
    dispatch({
        type: "GET_ORDERS_STARTED"
    })
    axios.post(BASE_URL + "/orders", instructions)

    console.log(instructions)
    
        .then((response) => {
            dispatch({ type: "GET_ORDERS_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}

//Add to cart
export function addToCart(dispatch, newItem) {
    //console.log("Actions: " + newItem.productdetailsid + ", " + newItem.quantity)
    dispatch({
        type: "ADD_TO_CART_STARTED"
    })
    dispatch({ type: "ADD_TO_CART_FINISHED", payload: newItem })
}

//Update cart
export function updateCart(dispatch, newCart) {
    console.log("In dispatcher: " + newCart)
    dispatch({
        type: "UPDATE_CART_STARTED"
    })
    dispatch({ type: "UPDATE_CART_FINISHED", payload: newCart })
}

//Go to checkout
export function goToCart(dispatch) {
    dispatch({
        type: "CHECKOUT_VIEW_STARTED"
    })
    dispatch({ type: "CHECKOUT_VIEW_FINISHED", payload: true })
}

//Product count
export function getProductCount(dispatch) {
    dispatch({
        type: "GET_PRODUCT_COUNT_STARTED"
    })
    axios.get(BASE_URL + "/products")
        .then((response) => {
            dispatch({ type: "GET_PRODUCT_COUNT_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}

//Order count
export function getOrderCount(dispatch) {
    dispatch({
        type: "GET_ORDER_COUNT_STARTED"
    })
    axios.get(BASE_URL + "/orders")
        .then((response) => {
            dispatch({ type: "GET_ORDER_COUNT_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}


/*
//RETRIEVE - get books as we page, update view, and sort
export function getPagedBooks(dispatch, instructions) {

    //console.log(instructions)

    dispatch({
        type: "GET_PAGE_STARTED"
    })

    axios.post(BASE_URL + "/pg", instructions)
        .then((response) => {
            dispatch({ type: "GET_PAGE_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}

//ADD
export function addABook(dispatch, newBook) {
    dispatch({
        type: "ADD_BOOK_STARTED"
    })
    axios.post(BASE_URL, newBook)
        .then((response) => {
            console.log(response.data)
            
            dispatch({ type: "ADD_BOOK_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}
//DELETE
export function deleteBook(dispatch, book) {

    dispatch({
        type: "DELETE_BOOK_STARTED"
    })

    axios.delete(BASE_URL + "/" + book.id)
        .then((response) => {
            dispatch({ type: "DELETE_BOOK_FINISHED", payload: book })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}
//EDIT
export function editBook(dispatch, book) {

    dispatch({
        type: "EDIT_BOOK_STARTED"
    })

    axios.put(BASE_URL + "/" + book.id, book)
        .then((response) => {
            dispatch({ type: "EDIT_BOOK_FINISHED", payload: book })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}
//SEARCH
export function searchFor(dispatch, forThis) {

    dispatch({
        type: "SEARCH_STARTED"
    })

    axios.get("http://localhost:5000/api/search/" + forThis)
        .then((response) => {
            dispatch({ type: "SEARCH_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}

//SORT
export function sortBy(dispatch, instructions) {

    console.log('Sort instructions:')
    console.log(instructions)

    dispatch({
        type: "SORT_STARTED"
    })

    console.log("In dispatcher:")
    console.log(instructions)

    axios.post(BASE_URL + "/pg", instructions)
        .then((response) => {

            console.log(response.data)

            dispatch({ type: "SORT_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })

}

//SORT
export function filterBy(dispatch, instructions) {
    
        console.log('Filter instructions:')
        console.log(instructions)
    
        dispatch({
            type: "FILTER_STARTED"
        })
    
        console.log("In dispatcher:")
        console.log(instructions)
    
        axios.post(BASE_URL + "/pg", instructions)
            .then((response) => {
    
                console.log(response.data)
    
                dispatch({ type: "FILTER_FINISHED", payload: response.data })
            })
            .catch((err) => {
                dispatch({ type: "CALL_FAILED", payload: err })
            })
    
    }
    */