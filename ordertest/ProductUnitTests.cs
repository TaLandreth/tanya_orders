using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using orders_library;
using orders_library.Services;

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

    }//end class
}//end nmspc
