export default class LineItem {
    constructor(productid, name, price, quantity) {
        this.productdetailsid = productid || 0
        this.productname = name || ''
        this.productprice = price || 0
        this.quantity = quantity || 0
    }
}
