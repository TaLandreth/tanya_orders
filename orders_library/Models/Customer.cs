using System;
using System.Collections.Generic;

namespace orders_library
{
    public class Customer
    {
        //Properties:
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Address> Addresses { get; set; }
    }
}