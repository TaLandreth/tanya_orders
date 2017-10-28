using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ordersAPI
{
    public class Address
    {
        public enum AddressTypes { SHIPPING, BILLING };

        public int Id { get; set; }

        public int CustomerDetailsId { get; set; }

        public Customer CustomerDetails { get; set; }
        public AddressTypes Addresstype { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Zip { get; set; }
    }
}
