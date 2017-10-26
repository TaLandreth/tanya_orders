using System;
using System.Collections.Generic;

namespace tanya_orders
{
    public class Customer
    {
        //Properties:
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Address> Addresses { get; set; }
    }
}