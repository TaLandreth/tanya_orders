using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace tanya_orders.Controllers
{
    public class HomeController
    {

        //To create table, create models to represent
        //Create 'context' w/ constructor to accept DbContext param; pass to parent constructor & create Dbset property for tables
        //Create controller, primary instance of OrderContext & assign context that we will receive in constructor to private property.
        //Create Index method that will return string, call EnsureCreated.

        //Create instance of OrderContext --> intermediary to db?
        private OrderDBContext _context;

        //Create constuctor, accepts 'context' as param
        public HomeController(OrderDBContext context)
        {
            _context = context;
        }


        //------- CRUD ------------
        //Entity Framework concept
        //pass values to param w/ query string -- adding to db using entity framework core tool
        //Take instance of Order's param
        //Return messages as string


        public string CreateOrder(OrderDetails order)
        {

            try
            {
                if (order.Id != 0 && order.Customer != null)
                {
                    _context.Add(order);
                    _context.SaveChangesAsync();  //performs asynchronously
                    return "Order added successfully";
                }
                else
                {
                    return "Order NOT added... Missing properties...";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        /*

        public string CreateLineItem(LineItem line)
        {
            try
            {
                if (line.Product != null && line.Quantity != 0)
                {
                    _context.Order.Add(line);
                    _context.SaveChangesAsync();  //performs asynchronously
                    return "Line added successfully";
                }
                else
                {
                    return "Line NOT added... Missing properties...";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string CreateCustomer(Customer customer)
        {
            try
            {
                if (customer.Id != 0 && customer.Name != null)
                {
                    _context.Add(customer);
                    _context.SaveChanges(); //performs synchronously
                    return "Customer added successfully";
                }
                else
                {
                    return "Customer NOT added... Missing properties...";
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string RetrieveOrder()
        {
            //return all of the orders to the orders variable?
            var orders = _context.Order.Include("Order");

            //Append details to string builder
            StringBuilder sb = new StringBuilder();

            //Check if anything retrieved
            if (orders == null)
            {
                return "No orders found.";
            }
            else
            {
                foreach (var o in orders)
                {
                    sb.Append($"OrderNumber: {o.Ordernumber} \r\n");  //what does the $ do?
                    sb.Append("------------------------------\r\n");

                }
                return sb.ToString();
            }

        }

        public string RetrieveOrderById(int? ordernum)
        {
            if (ordernum == null)
            {
                return "Enter order number...";
            }

            //if not null, retrieve from context the order where ordernumber = ordernum  //retrieve order
            var result = _context.Order.SingleOrDefaultAsync(o => o.Ordernumber == ordernum);
            //to include/display data from other classes, do .Include("Customer") -- section 3, lecture 7

            StringBuilder sb = new StringBuilder();
            var order = result.Result;   //return actual result, not the property (as retrieved by SingleOrDefault method above)

            if (order == null)
            {
                return "Order not found with given order number...";
            }
            else
            {
                sb.Append($"OrderNumber: {order.Ordernumber} \r\n");
                sb.Append("------------------------------\r\n");
                return sb.ToString();
            }
        }

        public string UpdateOrder(int ordernum, Order newOrder)
        { //also sending Order inst to specify new properties

            try
            {
                if (ordernum != newOrder.Ordernumber)
                {
                    return "Invalid data...";
                }
                else
                {
                    //check for properties of newOrder
                    if (newOrder.Customerdetails != null
                       && newOrder.Shipmethod != null
                       && newOrder.Lineitems != null)
                    {
                        //Entity framework:
                        _context.Update(newOrder);

                        //To tell EF exactly what updated
                        _context.Entry(newOrder).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

                        _context.SaveChanges();
                        return $"Order details for order # {ordernum} updated.";


                        /*(vs) Retrieve existing book details first, then update each field manually:
                         * 
                        var dbBook = _context.Order.SingleOrDefaultAsync(b => b.Ordernumber == ordernum);
                        dbBook.Result.Ordernumber = newOrder.Ordernumber;
                        dbBook.Result.Customerdetails = newOrder.Customerdetails;
                        dbBook.Result.Shipmethod = newOrder.Shipmethod;
                        dbBook.Result.Lineitems = newOrder.Lineitems;
                        dbBook.Result.discount = newOrder.discount;
                        _context.SaveChanges();
                        return $"Order details for order # {ordernum} updated.";
                        *
                        

                    }
                    else
                    {
                        return "Missing properties.....";
                    }
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        public string DeleteOrder(int ordernum)
        {
            try
            {

                if (ordernum == 0)
                {
                    return "Enter ordernumber...";
                }
                else
                {
                    var result = _context.Order.SingleOrDefaultAsync(o => o.Ordernumber == ordernum); //retrieve
                    var order = result.Result;
                    if (order == null)
                    {
                        return "Order not found...";
                    }
                    else
                    {
                        _context.Order.Remove(order); //completes when SaveChanges called
                        _context.SaveChanges();
                        return "Order deleted successfully.";
                    }
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        } */
    }
}
