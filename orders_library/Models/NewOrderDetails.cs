using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace orders_library
{
    public class NewOrderDetails
    {
        public int CustomerId { get; set; }
        public int ShippingMethodId { get; set; }
        public IEnumerable<NewLine> LineItems { get; set; }
        public int Status { get; set; }
        public string OrderDate { get; set; }
    }
}
