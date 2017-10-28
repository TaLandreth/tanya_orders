let initialState = {
    orderList: [],
    userId: '',
    productCount: 0,
    shoppingCart: [],
    productList: [],
    processing: '',
    APICallInProgress: false,
    APICallFailed: null,

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
            console.log('### Login Finished! Payload:' + action.payload)
            return { ...store, userId: action.payload, APICallInProgress: false }
        }

        case "LOGIN_FAILED": {
            console.log('### Login Failed! Reason: ' + action.payload)
            return { ...store, APICallFailed: action.payload, APICallInProgress: false }
        }


        //GET ORDERS_______________________________________________________________________:
        case "GET_ORDERS_STARTED": {
            console.log("### Retrieving ORDERS.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "GET_ORDERS_FINISHED": {
            console.log('### Retrieval finished!')

            var newContent = store.orderList.slice()
            if (store.orderList.length > store.productCount) {
                newContent = store.orderList.slice()
            }
            else { action.payload.forEach(a => newContent.push(a)) }

            return { ...store, orderList: newContent, APICallInProgress: false }
        }

        //ADD TO CART_____________________________________________________________:
        case "ADD_TO_CART_STARTED": {
            console.log("### Adding to cart.......")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "ADD_TO_CART_FINISHED": {
            console.log('### Add to cart finished!')

            console.log("Reducer: " + action.payload.productid)
            var newCart = store.shoppingCart.slice()
            newCart.push(action.payload)         

            return { ...store, shoppingCart: newCart, APICallInProgress: false }
        }

        //GET PRODUCTS_______________________________________________________________________:
        case "GET_PRODUCTS_STARTED": {
            console.log("### Retrieving PRODUCTS.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "GET_PRODUCTS_FINISHED": {
            console.log('### PRODUCTS Retrieval finished!')

            console.log("Length of payload " + action.payload.length)
            console.log("Length of store list " + store.productList.length)
            
            var newProds = store.productList.slice()

            console.log("Length of list copy " + newProds.length)
            
            if (store.productList.length === store.productCount) {
                newProds = store.productList.slice()
                console.log("If list count > product count: " + newProds.length)
            }
            else { action.payload.forEach(a => newProds.push(a))
                console.log("If list count is good :" + newProds.length)
            }

            return { ...store, productList: newProds, APICallInProgress: false }
        }

        //GET COUNT
        case "GET_COUNT_STARTED": {
            console.log("### Counting books.....")
            return { ...store, APICallInProgress: true, APICallFailed: null }
        }
        case "GET_COUNT_FINISHED": {
            console.log('### Counting finished!')
            return { ...store, productCount: action.payload, APICallInProgress: false }
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