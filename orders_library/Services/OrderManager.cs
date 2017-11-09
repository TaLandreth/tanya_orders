using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace orders_library.Services
{
    public class OrderManager
    {
        //LOGIN
        public UserModel Login(UserModel credential) //by order id
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {

                //RETRIEVE BY id
                var query = context.UserDetails.FirstOrDefault(a => a.username == credential.username && a.password == credential.password);

                var cust = context.Customer.First(c => query.CustomerId == c.Id);

                try
                {
                    var verify = context.UserDetails.First(a => a.id == query.id);

                    UserModel userVerified = new UserModel();

                    userVerified.id = cust.Id;
                    userVerified.CustomerId = cust.Id;
                    userVerified.username = query.username;
                    userVerified.password = "";

                    Console.WriteLine("Logged in successfully!");

                    Console.WriteLine($"Customer Id: {userVerified.CustomerId}");


                    return userVerified;
                }
                catch (Exception)
                {
                    Console.WriteLine("*** Error logging in");
                    return null;
                }
            }
        }

        //GET COUNT
        public int GetOrderCount(int id)
        {
            using (var context = DbContextFactory.Create())
            {
                var query = context.OrderDetails.Where(i => i.CustomerDetails.Id == id);

                var recordcount = query.Count();

                Console.WriteLine($"Order count: {recordcount}");

                return recordcount;
            }
        }


        //RETRIEVE ALL ORDERS - BY CUSTOMER ID & FILTER
        public IEnumerable<CustomerOrders> GetCustomerOrders(Instructions instr) //by cust id/status
        {
            using (var context = DbContextFactory.Create())
            {
                try
                {
                    var ord = context.OrderDetails.OrderByDescending(n => n.Id)
                                     .Include(l => l.Lineitems).ThenInclude(p => p.ProductDetails)
                                     .Where(o => o.CustomerDetails.Id == instr.userid).Skip(instr.startVal).Take(instr.viewAmt)
                                     .Select(x => new CustomerOrders
                                     {
                                         OrderId = x.Id,
                                         Date = x.OrderDate,
                                         CustomerId = x.CustomerDetails.Id,
                                         OrderStat = x.OrderStatus,
                                         Total = x.Lineitems.Sum(item => item.Quantity * item.ProductDetails.Price)
                                     }).ToList();

                    Console.WriteLine($"Orders retrieved for user: {ord.First().CustomerId}");
                    Console.WriteLine($"Qty of orders retrieved: {ord.Count()}");

                    return ord;

                }
                catch (Exception)
                {
                    Console.WriteLine("*** Error retrieving orders....");
                    return null;
                }
            }
        }

        //RETRIEVE - SINGLE ORDER BY CUSTOMER ID
        public OneOrder GetOrder(int id) //by cust id/status
        {
            using (var context = DbContextFactory.Create())
            {
                try
                {
                    var ord = context.OrderDetails
                                     .Include(s => s.Shipmethod)
                                     .Include(c => c.CustomerDetails).Include(a => a.CustomerDetails.Addresses)
                                     .Include(l => l.Lineitems).ThenInclude(p => p.ProductDetails)
                                     .Where(o => o.Id == id).First();

                    var returnOrder = new OneOrder();

                    returnOrder.Id = ord.Id;
                    returnOrder.CustomerDetails = ord.CustomerDetails;
                    returnOrder.Shipmethod = ord.Shipmethod;
                    returnOrder.Addresses = ord.CustomerDetails.Addresses;
                    returnOrder.Lineitems = ord.Lineitems.Where(l => l.OrderDetails.Id == id);
                    returnOrder.ProductDetails = ord.Lineitems.Select(p => p.ProductDetails);
                    returnOrder.OrderStatus = (orders_library.OneOrder.ShippingStatus)ord.OrderStatus;
                    returnOrder.OrderDate = ord.OrderDate;

                    Console.WriteLine($"Order #{ord.Id} retrieved for user: {ord.CustomerDetails.Id}");

                    return returnOrder;

                }
                catch (Exception)
                {
                    Console.WriteLine("*** Error retrieving order....");
                    return null;
                }
            }
        }


        //CANCEL ORDER 
        public OrderDetails CancelOrder(int id)
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                    //Locate order
                    var query = context.OrderDetails.FirstOrDefault(x => x.Id == id);


                    //Check if the queried ID = passed id
                    if (query == null)
                    {
                        Console.WriteLine("Order does not exist");
                        Console.WriteLine(id);
                        return null;
                    }
                    if (query.OrderStatus == OrderDetails.ShippingStatus.COMPLETED)
                    {
                        Console.WriteLine("Cannot cancel order -- already completed.");
                        return null;
                    }

                    query.OrderStatus = OrderDetails.ShippingStatus.CANCELED;

                    //Update the order to CANCELED
                    UpdateOrder(query);
                    context.SaveChanges();
                    Console.WriteLine($"Order ID {id} cancelled successfully");

                    return query;

                }
                catch (Exception)
                {
                    Console.WriteLine("\t*** Unable to cancel order.");
                    return null;
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

        //CREATE
        //This should take CUSTOMER ID, SHIPPING DETAILS, ARRAY OF LINE ITEMS & CREATE ORDER
        public OrderDetails CreateOrder(NewOrderDetails orderdetails)
        {
            LineItemManager linemgr = new LineItemManager();

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                var cust = context.Customer.Include(a => a.Addresses).FirstOrDefault(c => c.Id == orderdetails.CustomerId);

                var shipmethod = context.ShippingMethod.FirstOrDefault(s => s.Id == orderdetails.ShippingMethodId);

                var status = context.OrderDetails.FirstOrDefault(s => Convert.ToInt32(s.OrderStatus) == orderdetails.Status);

                var product = context.Product;

                var lines = new List<LineItem>();

                foreach(NewLine l in orderdetails.LineItems)
                {
                    var prod = product.FirstOrDefault(t => t.Id == l.ProductId);

                    LineItem newLine = new LineItem
                    {
                        Id = 0,
                        ProductDetails = prod,
                        Quantity = l.Quantity,
                        OrderDetails = null
                    };

                    lines.Add(newLine);
                }

                OrderDetails newOrder = new OrderDetails {
                    CustomerDetails = cust,
                    Shipmethod = shipmethod,
                    Lineitems = lines,
                    OrderStatus = status.OrderStatus,
                    OrderDate = orderdetails.OrderDate
                };

                try
                {
                    //Add order
                    context.OrderDetails.Add(newOrder);
                    context.SaveChanges();

                    Console.WriteLine($"Order {newOrder.Id} added....");

                    return newOrder;

                }
                catch (Exception)
                {
                    Console.WriteLine("Unable to add order....");
                    return null;
                }
            }
        }

    }//end order mgr
}//end namespace