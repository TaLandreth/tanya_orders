using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace orders_library
{
    public class NewLine
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }

    }
}