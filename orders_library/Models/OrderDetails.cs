using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace orders_library
{
    public class OrderDetails
    {
        public enum ShippingStatus { PROCESSING, COMPLETED, CANCELED };

        public int Id { get; set; }

        [JsonIgnore]
        public Customer CustomerDetails { get; set; }

        [JsonIgnore]
        public ShippingMethod Shipmethod { get; set; }

        [JsonIgnore]
        public IEnumerable<LineItem> Lineitems { get; set; }
        public ShippingStatus OrderStatus { get; set; }
        public String OrderDate { get; set; }
    }
}

