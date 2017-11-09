using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace orders_library
{
    public class Address
    {
        public enum AddressTypes { SHIPPING, BILLING };

        public int Id { get; set; }

        public AddressTypes Addresstype { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Zip { get; set; }

        [JsonIgnore]
        public Customer CustomerDetails { get; set; }

    }
}
