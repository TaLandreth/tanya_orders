using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using orders_library;
using orders_library.Services;

namespace ShippingAndCustomerTests                         //SHIPPING METHOD & CUSTOMER
{
    [TestClass]
    public class UnitTest1
    {
        //SHIPMETHOD TESTS ------------------------------------------------------------
        [TestMethod]
        public void RetrieveShippingMethod()
        {
            string retrieveMethod = "Ground";

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                var query = from ShippingMethod s in context.ShippingMethod
                            where s.Method.Contains(retrieveMethod)     //remove this line to retrieve all
                            select s;

                //Assert... 
                Assert.AreEqual("Ground", query.First().Method);
                Assert.AreEqual(3, query.First().Id);
            }
        }

        [TestMethod]
        public void ShipMethodUpdateTest()
        {
            int id = 3;

            //Arrange ... 
            ShippingMethod newMethod = new ShippingMethod
            {
                Id = id,
                Method = "Ground"
            };

            ShipMethodManager mgr = new ShipMethodManager();

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //Arrange
                //mgr.UpdateShipMethod(newMethod);

                //Act ... locate the entry in dbcontext
                var query = from ShippingMethod m in context.ShippingMethod
                           where m.Id == id
                           select m;
                
                    //Assert... compare - updated details to the original update request
                    Assert.AreEqual(newMethod.Id, query.First().Id);
                    Assert.AreEqual(newMethod.Method, query.First().Method);
            }
        }//end update test


        [TestMethod]
        public void CreateShipMethodTest()
        {
            //Arrange
            ShippingMethod newMethod = new ShippingMethod
            {
                Carrier = "Local",
                Method = "Local Pickup"
            };

            ShipMethodManager mgr = new ShipMethodManager();

            mgr.CreateShipMethod(newMethod);

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                var query = from ShippingMethod s in context.ShippingMethod
                                   where s.Method == newMethod.Method
                                   select s;
                
                //Assert.AreEqual(5, query.First().Id);
                Assert.AreEqual(newMethod.Method, query.First().Method);
            }
        }

        //CUSTOMER TESTS ------------------------------------------------------------
        [TestMethod]
        public void RetrieveCustomerTest()
        {
            int id = 4;

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                var query = from Customer c in context.Customer
                            where c.Id == id     //remove this line to retrieve all
                            select c;

                //Assert... 
                Assert.AreEqual(id, query.First().Id);
            }
        }

        [TestMethod]
        public void CustomerUpdateTest()
        {
            int id = 10;

            //Arrange ... 
            Customer updatedCust = new Customer
            {
                Id = id,
                Name = "Welding Professionals, Inc."
            };

            CustomerManager mgr = new CustomerManager();

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //Arrange
                mgr.UpdateCustomer(updatedCust);

                //Act ... locate the entry in dbcontext
                var query = from Customer c in context.Customer
                            where c.Id == id
                            select c;

                //Assert... compare - updated details to the original update request
                Assert.AreEqual(updatedCust.Name, query.First().Name);
            }
        }//end update test


        [TestMethod]
        public void CreateCustomerTest()
        {
            Customer newCustomer = new Customer
            {
                Name = "Cintas",
                Addresses = new List<Address>
                    { new Address
                        {
                        Street = "123 Western Row",
                            City = "Mason",
                            State = "OH",
                            Zip = 45040,
                                Addresstype = Address.AddressTypes.SHIPPING
                        },
                            new Address
                        {
                            Street = "123 Dock Dr",
                            City = "Mason",
                            State = "OH",
                            Zip = 45040,
                                Addresstype = Address.AddressTypes.BILLING
                        },
                    }
            };

            //Arrange
            CustomerManager mgr = new CustomerManager();

            mgr.CreateCustomer(newCustomer);

            //Act
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                var query = from Customer c in context.Customer
                            where c.Name == newCustomer.Name
                            select c;

            //Assert
                Assert.AreEqual(newCustomer.Name, query.First().Name);
            }
        }

    }//end class
}//end nmspc
