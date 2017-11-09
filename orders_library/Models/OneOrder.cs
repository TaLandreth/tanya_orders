using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace orders_library
{
    public class OneOrder
    {
        public enum ShippingStatus { PROCESSING, COMPLETED, CANCELED };

        public int Id { get; set; }
        public Customer CustomerDetails { get; set; }
        public IEnumerable<Address> Addresses { get; set; }
        public ShippingMethod Shipmethod { get; set; }
        public IEnumerable<LineItem> Lineitems { get; set; }
        public IEnumerable<Product> ProductDetails { get; set; }
        public ShippingStatus OrderStatus { get; set; }
        public String OrderDate { get; set; }
    }
}

