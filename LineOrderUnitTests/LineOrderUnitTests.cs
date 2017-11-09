using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using orders_library;
using orders_library.Services;

namespace LineOrderUnitTests
{
    [TestClass]
    public class UnitTest1
    {
        //LINEITEM TESTS ------------------------------------------------------------
        [TestMethod]
        public void LineItemRetrieveTest()
        {
            int lineid = 10;

            using (var context = DbContextFactory.Create())
            {
                //RETRIEVE BY id
                var query = from LineItem l in context.LineItem
                            where l.Id == lineid
                            select l;

                //Assert... 
                Assert.AreEqual(lineid, query.First().Id);
                Assert.AreEqual(1, query.First().Quantity);
            }
        }

        [TestMethod]
        public void LineItemUpdateTest()
        {
            //Arrange ... 
            LineItem updateLine = new LineItem
            {
                Id = 5,
                Quantity = 100
            };

            LineItemManager mgr = new LineItemManager();

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //Arrange
                mgr.UpdateLineItem(updateLine);

                //Act ... locate the entry in dbcontext
                var query = from LineItem l in context.LineItem
                            where l.Id == updateLine.Id
                            select l;

                //Assert... compare - updated details to the original update request
                Assert.AreEqual(updateLine.Id, query.First().Id);
                Assert.AreEqual(updateLine.Quantity, query.First().Quantity);

            }
        }//end update test

        //ORDER TESTS ------------------------------------------------------------
        //RETRIEVE 1 ORDER
        [TestMethod]
        public void OrderRetrievalTest()
        {
            int id = 32;

            OrderManager mgr = new OrderManager();
            OneOrder.ShippingStatus orderstatus = OneOrder.ShippingStatus.PROCESSING;

            var ord = mgr.GetOrder(id);

            //Assert... 
            Assert.AreEqual(id, ord.Id);
            Assert.IsNotNull(ord);
            Assert.AreEqual(orderstatus, ord.OrderStatus);

        }

        //DELETE/CANCEL ORDER
        [TestMethod]
        public void OrderCancelTest()
        {
            int m = 76;

            OrderManager mgr = new OrderManager();

            using (var context = DbContextFactory.Create())
            {
                //Act
                mgr.CancelOrder(m);

                //Act ... RETRIEVE
                var query = context.OrderDetails.FirstOrDefault(a => a.Id == m);

                Assert.AreEqual(OrderDetails.ShippingStatus.CANCELED, query.OrderStatus);
            }
        }

        //GET ORDER FOR CUSTOMER
        [TestMethod]
        public void GetCustomerOrdersTest()
        {
            int m = 1;
            OrderDetails.ShippingStatus orderstatus = OrderDetails.ShippingStatus.PROCESSING;

            using (var context = DbContextFactory.Create())
            {
                //Act
                var ord = context.OrderDetails
                 .Include(l => l.Lineitems).ThenInclude(p => p.ProductDetails)
                 .Where(o => o.OrderStatus == orderstatus && o.CustomerDetails.Id == m)
                 .Select(x => new
                 {
                     OrderId = x.Id,
                     Date = x.OrderDate,
                     CustomerId = x.CustomerDetails.Id,
                     OrderStat = x.OrderStatus,
                     Total = x.Lineitems.Sum(item => item.Quantity * item.ProductDetails.Price)
                 });

                //Act ... RETRIEVE


                Assert.AreEqual(orderstatus, ord.First().OrderStat);
                Assert.AreEqual(22.99, ord.First().Total);
            }


        }
    }
}
