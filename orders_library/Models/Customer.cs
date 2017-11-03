using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace orders_library
{
    public class Customer
    {
        //Properties:
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public IEnumerable<Address> Addresses { get; set; }
    }
}