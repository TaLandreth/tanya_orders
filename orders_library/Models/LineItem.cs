using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace orders_library
{
    public class LineItem
    {
        public int Id { get; set; }

        [JsonIgnore]
        public Product ProductDetails { get; set; }
        public int Quantity { get; set; }
        public OrderDetails OrderDetails { get; set; }

    }
}