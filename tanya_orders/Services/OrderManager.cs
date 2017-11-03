using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace tanya_orders.Services
{
    public class OrderManager
    {
        //RETRIEVE - SINGULAR
        public OrderDetails GetOrder(int id) //by order id
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //RETRIEVE BY id
                var query = context.OrderDetails.FirstOrDefault(a => a.Id == id);

                try
                {
                    Console.WriteLine($"\tOrder ID: {query.Id}");
                    Console.WriteLine($"\tOrder Status: {query.OrderStatus}");

                    return query;
                }
                catch (Exception)
                {
                    Console.WriteLine("*** Error retrieving order...");
                    return null;
                }
            }
        }

        //RETRIEVE - BY CUSTOMER ID & FILTER
        public void GetCustomerOrders(int id, OrderDetails.ShippingStatus orderstatus) //by cust id/status
        {
            using (var context = DbContextFactory.Create())
            {
                try
                {
                    //query.Include(x => x.Collection.Select(y => y.Property))

                    //From Orderdetails:
                    //Where status = status &  customer id = cust id
                    //Include order's lineitems & select lines w/ order's ID
                    //Include from Line Items the productdetails
                    //Batch it all together into x
                    var ord = context.OrderDetails                                    
                                     .Include(l => l.Lineitems).ThenInclude(p => p.ProductDetails)
                                     .Where(o => o.OrderStatus == orderstatus && o.CustomerDetails.Id == id)
                                     .Select(x => new
                                     {
                                         OrderId = x.Id,
                                         Date = x.OrderDate,
                                         CustomerId = x.CustomerDetailsId,
                                         OrderStat = x.OrderStatus,
                        Total = x.Lineitems.Sum(item => item.Quantity * item.ProductDetails.Price)
                                     });

                    foreach (var v in ord)
                    {
                        Console.WriteLine($"----------------\n");
                        Console.WriteLine($"Order Id: {v.OrderId}");
                        Console.WriteLine($"Order Date: {v.Date}");
                        Console.WriteLine($"Order Status: {v.OrderStat}");
                        Console.WriteLine($"Customer ID:{v.CustomerId}");
                        Console.WriteLine($"Order Total: {v.Total}");
                    }
                    //return orders;
                
                }
                catch (Exception)
                {
                    Console.WriteLine("\t*** Error retrieving orders....");
                    //return null;
                }
            }
        }

        //CREATE
        //This should take CUSTOMER ID, SHIPPING DETAILS, ARRAY OF LINE ITEMS & CREATE ORDER
        public void CreateOrder(OrderDetails newOrder)
        {
            //Console.WriteLine($"Order date: {newOrder.Date}");

            LineItemManager linemgr = new LineItemManager();

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                    //Add order
                    context.OrderDetails.Add(newOrder);
                    context.SaveChanges();

                    //For each line in newOrder, update it with new ID
                    foreach (LineItem l in newOrder.Lineitems)
                    {
                        //linemgr.UpdateLineItem(l); 
                        //Console.WriteLine(l.OrderDetailsId);
                    }

                    Console.WriteLine($"Order #{newOrder.Id} added.");
                }
                catch (Exception)
                {
                    Console.WriteLine("Unable to add order....");
                }
            }
        }

        //REMOVE --> can we change this function to be handled in the UPDATE function?
        public void CancelOrder(int id)
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //Locate order
                var query = context.OrderDetails.FirstOrDefault(x => x.Id == id);
                try
                {
                    //Check if the queried ID = passed id
                    if (query == null)
                    {
                        Console.WriteLine("Order does not exist");
                    }
                    if (query.OrderStatus == OrderDetails.ShippingStatus.COMPLETED)
                    {
                        Console.WriteLine("Cannot cancel order -- already completed.");
                    }
                    else if (query.Id == id)
                    {
                        query.OrderStatus = OrderDetails.ShippingStatus.CANCELED;

                        //Update the order to CANCELED
                        UpdateOrder(query);
                        context.SaveChanges();
                        Console.WriteLine($"Order ID {id} cancelled successfully");
                    }
                }
                catch (Exception)
                {
                    Console.WriteLine("\t*** Unable to cancel order.");
                }
            }
        }

        //UPDATE
        public void UpdateOrder(OrderDetails ord)
        {
            LineItemManager linemgr = new LineItemManager();

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                    //Locate order
                    var query = context.OrderDetails.FirstOrDefault(a => a.Id == ord.Id);

                    Console.WriteLine(query.Id);

                    //Update values

                    //If Id matches...
                    if (query.Id == ord.Id)
                    {
                        Console.WriteLine("Query id matches passed value...");

                        query.OrderStatus = ord.OrderStatus;
                        query.Shipmethod.Id = ord.Shipmethod.Id;

                        //Then Save changes to order
                        context.Entry(query).State = EntityState.Modified;
                        context.SaveChanges();

                        if (ord.Lineitems != null)
                        {
                            Console.WriteLine("UPDATED ORDER HAS LINES ");

                            //Update each line item
                            foreach (LineItem l in ord.Lineitems)
                            {
                                //if new line item, create it -- will contain order ID
                                if (l.Id == 0)
                                {
                                    linemgr.CreateLineItem(l);
                                }

                                else
                                {
                                    //Update
                                    linemgr.UpdateLineItem(l);
                                }

                            }// end foreach ql @ line (in query)
                        }

                        Console.WriteLine($"Order ID# {ord.Id} updated successfully.");

                    }//end id match
                }
                catch (Exception)
                {
                    Console.WriteLine("\t** Unable to update Order.");
                }
            }

        }//end update
    }//end order mgr
}//end namespace