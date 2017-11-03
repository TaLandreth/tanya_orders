using System;
using System.Collections.Generic;
using System.Linq;
using tanya_orders.Services;

namespace tanya_orders
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!\n");

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                Console.WriteLine("Test");
            }

            //ADDRESS HANDLING ------------------------------------
            AddressManager addrmgr = new AddressManager();

            var newAddress = new Address
            {
                Street = "3001 Hilltop Dr",
                City = "Novi",
                State = "Mi",
                Zip = 48335,
                Addresstype = Address.AddressTypes.SHIPPING
            };
            //CREATE ADDRESS:
            //addrmgr.CreateAddress(newAddress);

            /*
            Address updateAddress = new Address
            {
                CustomerDetails = {Id = 1},
                Id = 2,
                Street = "8 Eight Lane",
                City = "Maui",
                State = "Hi",
                Zip = 98765,
                Addresstype = Address.AddressTypes.SHIPPING
            };*/

            //UPDATE ADDRESS:
            //addrmgr.UpdateAddress(updateAddress);

            //REMOVE ADDRESS:
            //addrmgr.RemoveAddress(8);

            //RETRIEVE ADDRESS (ex; by customer Id
            //var addrrr = addrmgr.GetAddress(4);
            //Console.WriteLine(addrrr.First().Id);


            //PRODUCT HANDLING ------------------------------------------

            Product updateProd = new Product
            {
                Id = 3,
                Name = "Widget 5000 Updated",
                Price = 42.99
            };

            Product newProd2 = new Product
            {
                Name = "Widget B",
                Price = 5.00
            };

            ProductManager prodmgr = new ProductManager();

            //----RETRIEVE PRODUCT
            //var prod = prodmgr.GetProduct(1);
            //Console.WriteLine(prod.Name);

            //----UPDATE PRODUCT
            //prodmgr.UpdateProduct(updateProd);

            //----CREATE PRODUCT
            //prodmgr.CreateProduct(newProd2);

            //xxxx REMOVE PRODUCT - constraints <----- RETURN TO THIS
            //prodmgr.RemoveProduct(7);


            //SHIPPING METHOD HANDLING ------------------------------------------

            ShippingMethod updateMethod = new ShippingMethod
            {
                Id = 2,
                Method = "2nd Day",
                Carrier = "Fedex"
            };

            ShippingMethod newMethod1 = new ShippingMethod
            {
                Carrier = "UPS",
                Method = "Overnight"
            };

            ShipMethodManager shipmgr = new ShipMethodManager();

            //----RETRIEVE SHIPMETHOD
            //var m = shipmgr.GetShipMethod(1);
            //Console.WriteLine(m.Method);

            //----UPDATE SHIPMETHOD
            //shipmgr.UpdateShipMethod(updateMethod);

            //-----CREATE SHIPMETHOD
            //shipmgr.CreateShipMethod(newMethod1);

            //xxxx REMOVE SHIPMETHOD -> dependencies <----- RETURN TO THIS
            //shipmgr.RemoveShipMethod(3);


            //CUSTOMER HANDLING ------------------------------------------

            CustomerManager custmgr = new CustomerManager();

            //----RETRIEVE CUSTOMER - ok
            //var cust = custmgr.GetCustomer(2);
            //Console.WriteLine(cust.Name);

            Customer updatedCustomer = new Customer
            {
                Id = 2,
                Name = "My New Customer LLC"
            };

            Customer newCustomer = new Customer
            {
                Name = "Smart Data Systems",
                Addresses = new List<Address>
                    { new Address
                        {
                        Street = "8571 Gander Creek Dr",
                            City = "Miamisburg",
                            State = "OH",
                            Zip = 45342,
                            Addresstype = Address.AddressTypes.SHIPPING
                        },
                            new Address
                        {
                            Street = "8570 Gander Creek Dr",
                            City = "Miamisburg",
                            State = "OH",
                            Zip = 45342,
                                Addresstype = Address.AddressTypes.BILLING
                        },
                    }
            };



            //UPDATE CUSTOMER - ok
            //custmgr.UpdateCustomer(updatedCustomer);

            //CREATE CUSTOMER - ok
            //custmgr.CreateCustomer(newCustomer);

            //REMOVE CUSTOMER -> dependencies... this is odd... but it works...
            //custmgr.RemoveCustomer(7);

            //LINE ITEM HANDLING ------------------------------------------

           // LineItem updatedLine = new LineItem 
            //{ Id = 9, ProductDetails = new Product { Id = 2 }, Quantity = 100, Discount = 0.05, OrderDetailsId = 3};

           // LineItem newLine = new LineItem
            //{ ProductDetails = new Product { Id = 2 }, Quantity = 2, Discount = 0.05, OrderDetailsId = 2 };

            LineItemManager linemgr = new LineItemManager();

            //RETRIEVE LINE - ok
            //linemgr.GetLineItem(4);

            //UPDATE LINE - ok
            //linemgr.UpdateLineItem(updatedLine);

            //CREATE LINE
            //linemgr.CreateLineItem(newLine);

            //REMOVE LINE
            //linemgr.RemoveLineItem(2);

            //ORDER HANDLING ----------------------------------------------------------

            OrderManager ordermgr = new OrderManager();

            var newOrder = new OrderDetails
            {
                OrderDate = DateTime.Now.ToString("yyyy-MM-dd"),
                CustomerDetailsId = 2,
                Shipmethod = {
                    Id = 1,
                    Carrier= "UPS",
                    Method= "Overnight"
                },
                Lineitems = new LineItem[]
                {
                    new LineItem { ProductDetailsId = 6, Quantity = 22,
                        Discount = 0 },
                    new LineItem { ProductDetailsId = 5, Quantity = 1,
                        Discount = 0 }
                },
                OrderStatus = OrderDetails.ShippingStatus.PROCESSING
            };

            //CREATE ORDER
            //This should take CUSTOMER ID, SHIPPING DETAILS, ARRAY OF LINE ITEMS & CREATE ORDER
            //ordermgr.CreateOrder(newOrder);

            OrderDetails updatedOrder = new OrderDetails
            {
                Id = 3,
                Lineitems = null,
                Shipmethod = { Id = 1 },
                OrderStatus = OrderDetails.ShippingStatus.COMPLETED
            };

            //UPDATE ORDER
            //ordermgr.UpdateOrder(updatedOrder);

            //RETRIEVE ORDER - per ID (one at a time)
            //var ord = ordermgr.GetOrder(1);


            //Retrieval variables
                int id = 1;
                OrderDetails.ShippingStatus orderstatus = OrderDetails.ShippingStatus.PROCESSING;

            //RETRIEVE ORDERS FOR CUSTOMER (+ filter param?)
            //IQueryable<CustomerOrders> returnorders = 

                ordermgr.GetCustomerOrders(id, orderstatus);

            //Retrieve Status


            //CREATE ORDER
            //This should take CUSTOMER ID, SHIPPING DETAILS, ARRAY OF LINE ITEMS & CREATE ORDER
            //ordermgr.CreateOrder(newOrder);

            //CANCEL ORDER / flag it
            //ordermgr.CancelOrder(1);






        }//end Main
    }//end program
}//end namespace
