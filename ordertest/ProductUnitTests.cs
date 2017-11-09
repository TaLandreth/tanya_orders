using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using orders_library;
using orders_library.Services;

namespace ProductTests                     //ADDRESS & PRODUCT
{
    [TestClass]
    public class UnitTest1
    {

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
