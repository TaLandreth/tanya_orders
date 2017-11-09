let initialState = {
    orderList: [],
    userId: {},
    productCount: 0,
    orderCount: 0,
    shoppingCart: [],
    lastOrder: {},
    productList: [],
    productDetails: {},
    processing: '',
    APICallInProgress: false,
    APICallFailed: null,
    cartView: false,
    loginError: false,
    oneOrder: null,

    catalogView: true,
    ordersView: false,
    productView: false
}
export default function reducer(store = initialState, action) {

    switch (action.type) {
        case "CALL_FAILED": {
            console.log("### API Call Failed: " + action.payload)
            return { ...store, APICallInProgress: false, APICallFailed: action.payload }
        }

        //LOGIN
        case "LOGIN_STARTED": {
            console.log('### Login Started...')
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "LOGIN_FINISHED": {
            console.log('### Login Finished!')
            return { ...store, userId: action.payload, APICallInProgress: false, APICallFailed: false }
        }

        case "LOGIN_FAILED": {
            console.log('### Login Failed! Reason: ' + action.payload)
            return { ...store, APICallFailed: true, APICallInProgress: false }
        }

        //GET ORDERS_______________________________________________________________________:
        case "GET_ORDERS_STARTED": {
            console.log("### Retrieving ORDERS.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "GET_ORDERS_FINISHED": {
            console.log('### Retrieval finished!')

            return { ...store, orderList: action.payload, APICallInProgress: false }
        }

        //GET ORDERS_______________________________________________________________________:
        case "GET_ORDER_BY_ID_STARTED": {
            console.log("### Retrieving 1 ORDER.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "GET_ORDER_BY_ID_FINISHED": {
            console.log('### Retrieval finished!')

            console.log(action.payload)

            return { ...store, oneOrder: action.payload, APICallInProgress: false }
        }

        //ADD TO CART_____________________________________________________________:
        case "ADD_TO_CART_STARTED": {
            console.log("### Adding to cart.......")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "ADD_TO_CART_FINISHED": {
            console.log('### Add to cart finished!')
            var newCart = store.shoppingCart.slice()
            newCart.push(action.payload)

            return { ...store, shoppingCart: newCart, APICallInProgress: false }
        }

        //UPDATE CART_____________________________________________________________:
        case "UPDATE_CART_STARTED": {
            console.log("### Update cart.......")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "UPDATE_CART_FINISHED": {
            console.log('### Update cart finished!')

            return { ...store, shoppingCart: action.payload, APICallInProgress: false }
        }

        //CLEAR CART_____________________________________________________________:
        case "CLEAR_CART_STARTED": {
            console.log("### Clearing cart.......")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "CLEAR_CART_FINISHED": {
            console.log('### Cart cleared!')

            return { ...store, shoppingCart: action.payload, APICallInProgress: false }
        }

        //PLACE ORDER_____________________________________________________________:
        case "PLACE_ORDER_STARTED": {
            console.log("### Placing order.......")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "PLACE_ORDER_FINISHED": {
            console.log('### Order placed!')
            return { ...store, lastOrder: action.payload, APICallInProgress: false }
        }

        //GET PRODUCTS_______________________________________________________________________:
        case "GET_PRODUCTS_STARTED": {
            console.log("### Retrieving PRODUCTS.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "GET_PRODUCTS_FINISHED": {
            return { ...store, productList: action.payload, APICallInProgress: false }
        }

        //VIEW A PRODUCT_______________________________________________________________________:
        case "VIEW_PRODUCT_STARTED": {
            console.log("### View product started.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "VIEW_PRODUCT_FINISHED": {
            console.log("### View product finished.....")
            return {
                ...store,
                productDetails: action.payload.product,
                catalogView: action.payload.catalogView,
                productView: action.payload.productView,
                ordersView: action.payload.ordersView,
                APICallInProgress: false
            }
        }

        //GET PRODUCT COUNT -----------------------------------------------------------
        case "GET_PRODUCT_COUNT_STARTED": {
            console.log("### Counting products.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "GET_PRODUCT_COUNT_FINISHED": {
            console.log('### Counting finished!')
            return { ...store, productCount: action.payload, APICallInProgress: false }
        }

        //GET ORDER COUNT
        case "GET_ORDER_COUNT_STARTED": {
            console.log("### Counting orders.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "GET_ORDER_COUNT_FINISHED": {
            console.log('### Counting finished!')
            return { ...store, orderCount: action.payload, APICallInProgress: false }
        }

        //GO TO CATALOG_____________________________________________________________:
        case "VIEW_CATALOG_STARTED": {
            console.log("### Catalog view.......")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "VIEW_CATALOG_FINISHED": {
            console.log('### In Catalog View!')

            console.log(action.payload)

            return {
                ...store,
                catalogView: action.payload.catalogView,
                productView: action.payload.productView,
                ordersView: action.payload.ordersView, APICallInProgress: false
            }
        }

        default: {
            return store
        }
    }

}