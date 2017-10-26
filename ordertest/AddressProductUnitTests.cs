using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using tanya_orders;
using tanya_orders.Services;

namespace ordertest                     //ADDRESS & PRODUCT
{
    [TestClass]
    public class UnitTest1
    {
        //ADDRESS ACTIONS............................................................

        [TestMethod]
        public void AddressRetrievalTest()
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //Act ... find any address containing 'Cincinnati'
                var query = from Address addr in context.Address
                            where addr.City.Contains("Cincinnati")
                            select addr;

                //Act ... find any address containing 'Cleveland'
                var query2 = from Address addr in context.Address
                             where addr.City.Contains("Cleveland")
                             select addr;

                //Assert... The first customer id with address in Cincinnati is 1
                Assert.AreEqual(query.First().CustomerDetails, 1);
                //Assert... The first customer id with address in Cleveland is 3
                Assert.AreEqual(query2.First().CustomerDetails, 3);
            }
        }

        [TestMethod]
        public void AddressUpdateTest()
        {
            int idnum = 0;
            //Arrange ... 
            Address updateAddress = new Address
            {
                Id = idnum,
                CustomerDetails = 1,
                Street = "Premium Mfg Blvd",
                City = "Quality",
                State = "MI",
                Zip = 48835,
                Addresstype = Address.AddressTypes.BILLING
            };

            AddressManager mgr = new AddressManager();

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //Arrange
                mgr.UpdateAddress(updateAddress);

                //Act ... locate the entry in dbcontext
                var addr = from Address a in context.Address
                           where a.Id == idnum
                           select a;

                if (addr.First().Id == idnum)
                {
                    //Assert... compare - updated details to the original update request
                    Assert.AreEqual(updateAddress.Id, addr.First().Id);
                    Assert.AreEqual(updateAddress.CustomerDetails, addr.First().CustomerDetails);
                    Assert.AreEqual(updateAddress.Street, addr.First().Street);
                    Assert.AreEqual(updateAddress.City, addr.First().City);
                    Assert.AreEqual(updateAddress.State, addr.First().State);
                    Assert.AreEqual(updateAddress.Zip, addr.First().Zip);
                    Assert.AreEqual(updateAddress.Addresstype, addr.First().Addresstype);
                }

            }
        }//end update test

        [TestMethod]
        public void AddressCreateTest()
        {
            //Arrange
            Address newAddr = new Address
            {
                CustomerDetails = 2,
                Addresstype = Address.AddressTypes.SHIPPING,
                Street = "1 Grant St",
                City = "Colerain",
                State = "Ohio",
                Zip = 45454
            };

            AddressManager mgr = new AddressManager();

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //Arrange
                mgr.CreateAddress(newAddr);

                //Act ... RETRIEVE
                var query = from Address a in context.Address
                             where a.Street == newAddr.Street
                            select a;

                //Assert... the address we added is there
                Assert.AreEqual(newAddr.Street, query.First().Street);
            }
        }

        [TestMethod] //--------------------------------------------------> this does not like me...
        public void AddressDeletionTest()
        {
            int addy = 18;

            AddressManager mgr = new AddressManager();

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //Act
                mgr.RemoveAddress(addy);

                //Act ... RETRIEVE
                var addrDelete = from Address a in context.Address
                                 where a.Id == addy
                                 select a;

                Assert.IsNull(addrDelete.FirstOrDefault(x => x.Id == addy));
            }
        }

        //PRODUCT ACTIONS............................

        [TestMethod]
        public void ProductRetrievalTest()
        {
            int pr = 2;

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //Act ... find any product containing 'Widget'
                var query = from Product prod in context.Product
                            where prod.Name.Contains("Widget")
                            select prod;

                //Act ... find product with Id of pr
                var query2 = from Product prod in context.Product
                             where prod.Id == pr
                             select prod;

                //Assert... The first product with name of 'Widget' is Widget Product
                Assert.AreEqual(query.First().Name, "Widget Product");

                //Assert... Verify Id of retrieved product is what we asked for
                Assert.AreEqual(query2.First().Id, pr);
            }
        }

        [TestMethod]
        public void ProductUpdateTest()
        {
            int num = 9;

            ProductManager mgr = new ProductManager();

            //Arrange ... 
            Product updateProduct = new Product
            {
                Id = num,
                Name = "Multipurpose Tool",
                Price = 8.99
            };

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //Arrange

                mgr.UpdateProduct(updateProduct);

                //Act ... locate the entry in dbcontext
                var prod = from Product p in context.Product
                           where p.Id == num
                           select p;

                //Assert... Verify Id of retrieved product is what we asked for
                Assert.AreEqual(prod.First().Id, num);

                if (prod.First() != null)
                {
                    Assert.AreEqual(updateProduct.Name, prod.First().Name);
                    Assert.AreEqual(updateProduct.Price, prod.First().Price);
                }
            }
        }//product update method

        [TestMethod]
        public void ProductCreateTest()
        {
            //Arrange
            Product newProd3 = new Product
            {
                Name = "Widget ULTRA II",
                Price = 1000.99
            };

            ProductManager mgr = new ProductManager();

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //Arrange
                //mgr.CreateProduct(newProd3);

                //Act ... RETRIEVE
                var query = from Product p in context.Product
                            where p.Name == newProd3.Name
                            select p;

                //Assert... the product we added is there
                Assert.AreEqual(newProd3.Name, query.First().Name);
            }
        }

        [TestMethod]
        public void ProductDeleteTest()
        {
            int prodnum = 0; //zero will always assert null

            ProductManager mgr = new ProductManager();

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //Arrange - remove
                mgr.RemoveProduct(prodnum);

                //Act .... verify product is no longer found
                var prodDeleted = from Product a in context.Product
                                  where a.Id == prodnum
                                  select a;
                //Assert
                Assert.IsNull(prodDeleted.FirstOrDefault(x => x.Id == prodnum));
            }
        }






        //end unit test class



        /*
        [TestMethod]
        public void OrdersExist()
        {
            //OrderFactory factory = new OrderFactory();
            //Assert.IsTrue(factory.GetOrders().Count() > 0);


        }

        [TestMethod]
        public void TestQuery() {

            OrderFactory factory = new OrderFactory();

            var query = from OrderDetails ord in factory.GetOrders()
                        where ord.Customer.Addresses.Any(a => a.Addresstype == Address.AddressTypes.BILLING && a.Zip == 676767)
                        select ord.Lineitems;

            Assert.AreEqual(query.Count(), 1);      //check if 1 found
            Assert.AreEqual(query.First().First().Product.Name, "Widget P");   //verify 1st item is = what you're loooking for
        }

        [TestMethod]
        public void TestShippingMethod()
        {
            //Arrange
            OrderFactory factory = new OrderFactory();

            //Act
            var query = from OrderDetails ord in factory.GetOrders()
                        where ord.Shipmethod.Method.Equals("Overnight")
                        select ord.Ordernumber;

            //Assert:  Check for order numbers that have OVERNIGHT shipping
            Assert.AreEqual(query.Count(), 1);          //check if 1 found
            Assert.AreEqual(query.First(), 2);          //it found the one order with OVERNIGHT shipping
        }

        [TestMethod]
        public void TestProductPrice()
        {
            //Arrange
            OrderFactory factory = new OrderFactory();

            //Act
            var query = from OrderDetails ord in factory.GetOrders()
            where ord.Lineitems.Any(a => a.Product.Price >= 50.00)
            select ord;

            //Assert:  Test for products of price > 50.00
            Assert.AreEqual(query.Count(), 3);          //check if 3 found (per the query)
            Assert.AreEqual(query.First().Ordernumber, 1); //is the first orderid found # 1?
            Assert.AreEqual(query.First().Lineitems.First().Product.Price, 2.99); //is the first order's first line item's product price = 2.99?
        }

*/

    }//end class
}//end nmspc
