using System;
using System.Collections.Generic;

namespace tanya_orders
{
    public class OrderFactory
    {
        public OrderFactory()
        {
        }

        public IEnumerable<OrderDetails> GetOrders() {
            return new List<OrderDetails>
            {new OrderDetails
                {
                    Ordernumber = 1,
                    Customer = new Customer
                    {
                        Id = 1,
                        Name = "Fun Night Inc",
                        Addresses = new List<Address> { new Address
                        {
                            Street = "123 Test Dr, STE 3",
                            City = "Dayton",
                            State = "OH",
                            Zip = 676767,
                                Addresstype = Address.AddressTypes.BILLING
                        },
                            new Address
                        {
                            Street = "456 Test Dr, STE 3",
                            City = "Cincinnati",
                            State = "OH",
                            Zip = 45044,
                                Addresstype = Address.AddressTypes.SHIPPING
                        },
                        }
                    },
                    Shipmethod = new ShippingMethod { Method = "Ground" },
                    Lineitems = new LineItem[] {
                    new LineItem { Product = new Product { Name = "Widget P", Price = 2.99 }, Quantity = 32},
                    new LineItem { Product = new Product { Name = "Widget Q", Price = 400.00 }, Quantity = 1},
                    new LineItem { Product = new Product { Name = "Widget R", Price = 50.00 }, Quantity = 4}
                    },
                    Discount = 0
                },
                new Order
      Details          {
                    Ordernumber = 2,
                    Customer = new Customer
                    {
                        Id = 1,
                        Name = "Shipshape",
                        Addresses = new List<Address> { new Address
                        {
                            Street = "123 Test Dr, STE 3",
                            City = "Dayton",
                            State = "OH",
                            Zip = 45044,
                                Addresstype = Address.AddressTypes.BILLING
                        },
                            new Address
                        {
                            Street = "456 Test Dr, STE 3",
                            City = "Cincinnati",
                            State = "OH",
                            Zip = 45044,
                                Addresstype = Address.AddressTypes.SHIPPING
                        },
                        }
                    },
                    Shipmethod = new ShippingMethod { Method = "Overnight" },
                    Lineitems = new LineItem[] {
                    new LineItem { Product = new Product { Name = "Widget 1", Price = 2.99 }, Quantity = 32},
                    new LineItem { Product = new Product { Name = "Widget 2", Price = 400.00 }, Quantity = 1},
                    new LineItem { Product = new Product { Name = "Widget 3", Price = 50.00 }, Quantity = 4}
                    },
                    Discount = 0
                },
                    new Order
             Details   {
                    Ordernumber = 3,
                    Customer = new Customer
                    {
                        Id = 1,
                        Name = "ABC Inc",
                        Addresses = new List<Address> { new Address
                        {
                            Street = "123 Test Dr, STE 3",
                            City = "Menlo",
                            State = "CA",
                            Zip = 94823,
                                Addresstype = Address.AddressTypes.BILLING
                        },
                            new Address
                        {
                            Street = "456 Test Dr, STE 3",
                            City = "Menlo",
                            State = "CA",
                                Zip = 94823,
                                Addresstype = Address.AddressTypes.SHIPPING
                        },
                        }
                    },
                    Shipmethod = new ShippingMethod { Method = "2day" },
                    Lineitems = new LineItem[] {
                    new LineItem { Product = new Product { Name = "Widget 1", Price = 2.99 }, Quantity = 32},
                    new LineItem { Product = new Product { Name = "Widget 2", Price = 400.00 }, Quantity = 1},
                    new LineItem { Product = new Product { Name = "Widget 3", Price = 50.00 }, Quantity = 4}
                    },
                    Discount = 0
                }
            };
        }
    }
}
