using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using tanya_orders;
using tanya_orders.Services;

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

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //RETRIEVE BY id
                var query = from LineItem l in context.LineItem
                            where l.Id == lineid     //remove this line to retireve all
                            select l;

                //Assert... 
                Assert.AreEqual(2, query.First().ProductDetails);
                Assert.AreEqual(12, query.First().Quantity);
            }
        }

        [TestMethod]
        public void LineItemUpdateTest()
        {
            //Arrange ... 
            LineItem updateLine = new LineItem
            {
                Id = 5,
                Quantity = 10000,
                Discount = 0.10,
                OrderDetailsId = 2,
                ProductDetailsId = 5
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

        [TestMethod] //Abandoned for now --------------->THIS HAS ORDER DEPENDENCIES.
        public void LineItemDeleteTest()
        {
            /*
            int m = 6;

            ShipMethodManager mgr = new ShipMethodManager();

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //Act
                mgr.RemoveShipMethod(m);

                //Act ... RETRIEVE
                var methodDelete = from ShippingMethod a in context.ShippingMethod
                                   where a.Id == m
                                   select a;

                Assert.IsNull(methodDelete.FirstOrDefault(x => x.Id == m));
            }
            */
        }


        //ORDER TESTS ------------------------------------------------------------
        //RETRIEVE 1 ORDER
        [TestMethod]
        public void OrderRetrievalTest()
        {
            int id = 1;

            OrderManager mgr = new OrderManager();

            var ord = mgr.GetOrder(id);

            //Assert... 
            Assert.AreEqual(1, ord.Id);
            Assert.IsNotNull(ord);

            //??????????
            Assert.AreEqual(2, ord.Lineitems.Count());

        }

        //CREATE ORDER
        [TestMethod]
        public void CreateOrderTest()
        {
            OrderManager mgr = new OrderManager();

            var newOrder = new OrderDetails
            {
                OrderDate = DateTime.Now.ToString("yyyy-MM-dd"),
                CustomerDetailsId = 2,
                Shipmethod = { Id = 1 },
                Lineitems = new LineItem[]
    {
                    new LineItem { ProductDetailsId = 6, Quantity = 22,
                        Discount = 0 },
                    new LineItem { ProductDetailsId = 5, Quantity = 1,
                        Discount = 0 }
    },
                OrderStatus = OrderDetails.ShippingStatus.PROCESSING
            };

            mgr.CreateOrder(newOrder);

            //Assert... 
            Assert.AreEqual(6, newOrder.Id);
            //Assert.IsNotNull(newOrder.Lineitems);

        }

        //DELETE/CANCEL ORDER
        [TestMethod]
        public void OrderCancelTest()
        {
            int m = 1;

            OrderManager mgr = new OrderManager();

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
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

            OrderManager mgr = new OrderManager();

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //Act
                var ord = context.OrderDetails
                 .Include(l => l.Lineitems).ThenInclude(p => p.ProductDetails)
                 .Where(o => o.OrderStatus == orderstatus && o.CustomerDetails.Id == m)
                 .Select(x => new
                 {
                     OrderId = x.Id,
                     Date = x.OrderDate,
                     CustomerId = x.CustomerDetailsId,
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
