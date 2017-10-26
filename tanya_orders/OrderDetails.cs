using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace tanya_orders
{
    public class OrderDetails
    {
        public enum ShippingStatus { PROCESSING, COMPLETED, CANCELED };

        public int Id { get; set; }

        public int CustomerDetailsId { get; set;  }
        public Customer CustomerDetails { get; set; }

        public int ShipmethodId { get; set; }
        public ShippingMethod Shipmethod { get; set; }
        public IEnumerable<LineItem> Lineitems { get; set; }
        public ShippingStatus OrderStatus { get; set; }
        public String OrderDate { get; set; }
    }
}

