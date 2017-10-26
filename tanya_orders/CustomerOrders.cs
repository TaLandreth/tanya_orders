using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace tanya_orders
{
    public class CustomerOrders
    {
        public int OrderId { get; set; }
        public string Date { get; set; }
        public int CustomerId { get; set; }
        public OrderDetails.ShippingStatus OrderStat { get; set; }
        public double Total { get; set; }

    }
}

