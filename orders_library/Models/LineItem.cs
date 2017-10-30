using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace orders_library
{
    public class LineItem
    {
        public int Id { get; set; }

        public int ProductDetailsId { get; set; }
        public Product ProductDetails { get; set; }
        public int Quantity { get; set; }

        public int OrderDetailsId { get; set; }
        public OrderDetails OrderDetails { get; set; }
        public double Discount { get; set; }
    }
}