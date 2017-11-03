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
    cartView: false

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
            console.log('### Login Finished! Payload:' + action.payload.id)

            var userData = { id: action.payload.id, username: action.payload.username }

            return { ...store, userId: userData, APICallInProgress: false, APICallFailed: false}
        }

        case "LOGIN_FAILED": {
            console.log('### Login Failed! Reason: ' + action.payload)
            return { ...store, APICallFailed: action.payload, APICallInProgress: false, APICallFailed: true  }
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

        //ADD TO CART_____________________________________________________________:
        case "ADD_TO_CART_STARTED": {
            console.log("### Adding to cart.......")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "ADD_TO_CART_FINISHED": {
            console.log('### Add to cart finished!')

            //console.log("Reducer: " + action.payload)
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

            console.log("In reducer: " + action.payload)

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

            //console.log("In reducer: " + action.payload)

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
            //console.log(action.payload)

            return { ...store, productDetails: action.payload, APICallInProgress: false }
        }



        //GET PRODUCT COUNT -----------------------------------------------------------
        case "GET_PRODUCT_COUNT_STARTED": {
            console.log("### Counting products.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "GET_PRODUCT_COUNT_FINISHED": {
            console.log('### Counting finished!')

            //console.log("# of products: " + action.payload)
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

        ///////////////////////////////////////////////////////////////////////////



        //ADD
        case "ADD_BOOK_STARTED": {
            console.log("### Adding a book.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "ADD_BOOK_FINISHED": {
            console.log('### Add finished!')
            console.log(action.payload)

            return { ...store, bookshelfContent: add(store.bookshelfContent, action.payload), APICallInProgress: false }
        }
        //DELETE
        case "DELETE_BOOK_STARTED": {
            console.log("### Deleting a book.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "DELETE_BOOK_FINISHED": {
            console.log('### Delete finished!')
            return { ...store, bookshelfContent: remove(store.bookshelfContent, action.payload), APICallInProgress: false }
        }

        //SEARCH ------------------------
        case "SEARCH_STARTED": {
            console.log("### Searching for.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "SEARCH_FINISHED": {
            console.log('### Search finished!')
            return { ...store, searchList: action.payload, APICallInProgress: false }
        }

        //SORT
        case "SORT_STARTED": {
            console.log("### Sorting.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "SORT_FINISHED": {
            console.log('### Sort finished!')
            return { ...store, bookshelfContent: action.payload, APICallInProgress: false }
        }

        //SORT
        case "FILTER_STARTED": {
            console.log("### Sorting.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }

        case "FILTER_FINISHED": {
            console.log('### Sort finished!')
            return { ...store, bookshelfContent: action.payload, APICallInProgress: false }
        }


        default: {
            return store
        }
    }

}

// HELPERS: ~~~~~~~~~~~~~~~~~~~~~~~~~~~

//---------- ADD ------------------
export function add(books, newbook) {

    let newBookArr = books.slice();
    newBookArr.push(newbook)

    return newBookArr
}


//---------- DELETE ------------------
export function remove(books, newbook) {

    let newBookArr = books.slice();

    newBookArr = books.filter(b => b.id !== newbook.id)

    return newBookArr;
}

/* //---------- SEARCHING ------------------
export function searching(books, thing) {
    let bookies = books.slice()

    var term = thing.toLowerCase()

    var i = 0
    var searchBooks
    for (i; i < bookies.length; i++) {

        searchBooks = bookies.filter((b) => {
            if (b.author.toLowerCase().includes(term)) { return b.author.toLowerCase().includes(term); }
            if (b.title.toLowerCase().includes(term)) { return b.title.toLowerCase().includes(term); }
            if (b.genre.toLowerCase().includes(term)) { return b.genre.toLowerCase().includes(term); }
            if (b.year.toString().includes(thing)) { return b.year.toString().includes(thing); }
        })
    }
    return searchBooks;

} */

/* 

        //GET VIEW:
        case "GET_VIEW_STARTED": {
            console.log("### Retrieving books.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "GET_VIEW_FINISHED": {
            console.log('### Retrieval finished!')
            console.log(action.payload)
            return { ...store, page: action.payload, APICallInProgress: false }
        } */


/*         //SORT ------------------------
 */