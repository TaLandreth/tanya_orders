import axios from "axios";

const BASE_URL = "http://localhost:5000/api"

//LOGIN
export function onLogin(user, dispatch) {
    dispatch({
        type: "LOGIN_STARTED"
    })
    axios.post(BASE_URL + "/login", user)
        .then((response) => {
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
            dispatch({ type: "GET_PRODUCTS_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}

//VIEW A PRODUCT
export function viewProduct(dispatch, instructions) {
    dispatch({
        type: "VIEW_PRODUCT_STARTED"
    })
    dispatch({ type: "VIEW_PRODUCT_FINISHED", payload: instructions })
}



//RETRIEVE ORDERS - 
export function getOrders(dispatch, instructions) {

    dispatch({
        type: "GET_ORDERS_STARTED"
    })
    axios.post(BASE_URL + "/orders", instructions)
        .then((response) => {
            dispatch({ type: "GET_ORDERS_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}

//RETRIEVE ORDERS - 
export function getOrderById(dispatch, id) {
    
        dispatch({
            type: "GET_ORDER_BY_ID_STARTED"
        })
        axios.post(BASE_URL + "/ordernumber/" + id)
            .then((response) => {
                dispatch({ type: "GET_ORDER_BY_ID_FINISHED", payload: response.data })
            })
            .catch((err) => {
                dispatch({ type: "CALL_FAILED", payload: err })
            })
    }

//CANCEL ORDER
export function cancelOrder(dispatch, id, instructions) {

    dispatch({
        type: "CANCEL_ORDER_STARTED"
    })
    axios.post(BASE_URL + "/ordercancel/" + id)
        .then((response) => {
            axios.post(BASE_URL + "/orders", instructions)
                .then((response) => {
                    dispatch({ type: "GET_ORDERS_FINISHED", payload: response.data })
                })
                .catch((err) => {
                    dispatch({ type: "CALL_FAILED", payload: err })
                })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })

}

//PLACE ORDER - 
export function completeOrder(dispatch, neworder) {
    dispatch({
        type: "PLACE_ORDER_STARTED"
    })
    axios.post(BASE_URL + "/ordernew", neworder)
        .then((response) => {
            dispatch({type: "PLACE_ORDER_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}

//Add to cart
export function addToCart(dispatch, newItem) {
    dispatch({
        type: "ADD_TO_CART_STARTED"
    })
    dispatch({ type: "ADD_TO_CART_FINISHED", payload: newItem })
}

//Update cart
export function updateCart(dispatch, newCart) {    
    dispatch({
        type: "UPDATE_CART_STARTED"
    })
    dispatch({ type: "UPDATE_CART_FINISHED", payload: newCart })
}

//CLEAR cart
export function clearCart(dispatch) {
    dispatch({
        type: "CLEAR_CART_STARTED"
    })
    dispatch({ type: "CLEAR_CART_FINISHED", payload: [] })
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
export function getOrderCount(dispatch, id) {
    dispatch({
        type: "GET_ORDER_COUNT_STARTED"
    })
    axios.get(BASE_URL + "/orders/" + id)
        .then((response) => {
            dispatch({ type: "GET_ORDER_COUNT_FINISHED", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "CALL_FAILED", payload: err })
        })
}

//CLEAR cart
export function menuChoice(dispatch, instructions) {
    dispatch({
        type: "VIEW_CATALOG_STARTED"
    })

    console.log(instructions)

    dispatch({ type: "VIEW_CATALOG_FINISHED", payload: instructions })
}