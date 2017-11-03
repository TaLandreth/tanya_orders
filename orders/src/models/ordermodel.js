export default class OrderModel {
    constructor(customerid, shipmethod, lines, status, date) {
        this.CustomerId = customerid || 0
        this.ShippingMethodId = shipmethod || 0
        this.LineItems = lines || []
        this.Status = status || 0
        this.OrderDate = date || 0
    }
}