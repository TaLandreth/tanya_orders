using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace orders_library.Services
{
    public class CustomerManager
    {
        //RETRIEVE
        public Customer GetCustomer(int id) //by method name
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                    //RETRIEVE BY customer id
                    var query = context.Customer.FirstOrDefault(a => a.Id == id);

                    return query;
                }
                catch(Exception){
                    Console.WriteLine("No customer found.");

                    return null;
                }
            }
        }

        //UPDATE
        public void UpdateCustomer(Customer updatedCustomer)
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                    //Locate customer
                    var query = context.Customer.FirstOrDefault(a => a.Id == updatedCustomer.Id);

                    Console.WriteLine($"Passed Customer ID {updatedCustomer.Id}");
                    Console.WriteLine($"Queried Customer ID {query.Id}");

                    //Update customer name
                    query.Name = updatedCustomer.Name;

                    //If Id matches...
                    if (query.Id == updatedCustomer.Id)
                    {
                        context.Entry(query).State = EntityState.Modified;
                        context.SaveChanges();
                        Console.WriteLine($"Customer ID# {updatedCustomer.Id} updated successfully.");
                    }
                }
                catch (Exception)
                {
                    Console.WriteLine("Unable to update Customer.");
                }
            }
        }

        //CREATE
        public void CreateCustomer(Customer newCust)
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                    context.Customer.Add(newCust);
                    context.SaveChanges();
                    Console.WriteLine($"New Customer {newCust.Name} added.");
                }
                catch (Exception)
                {
                    Console.WriteLine("Unable to add customer.");
                }
            }
        }

        //REMOVE **************************************************************************
        public void RemoveCustomer(int id) //Dependent orders & addresses
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                    //Locate customer with customer id = id passed
                    var customerquery = context.Customer.FirstOrDefault(x => x.Id == id);

                    //Locate ANY dependent orders
                    var orderquery = from OrderDetails o in context.OrderDetails
                                     //where o.CustomerId.Id == id
                                     select o;

                    //Locate ANY dependent addresses
                    var addressquery = from Address a in context.Address
                                       where a.CustomerDetails.Id == id
                                       select a;

                    Console.WriteLine($"Customers Found: {customerquery.Name}");
                    Console.WriteLine($"Dependent orders: {orderquery.Count()}");
                    Console.WriteLine($"Dependent addresses: {addressquery.Count()}");

                    //Chec if the queried Customer ID = passed id 
                    if (customerquery.Id == id)
                    {
                        //Check if any orders for this customer exist
                        if (orderquery.Count() > 0)
                        {
                            Console.WriteLine("Unable to delete customer; orders exist.");
                        }
                        else
                        {
                            //No orders, then delete dependent addresses:
                            foreach (Address a in addressquery)
                            {
                            }

                            //And finally remove the customer
                            context.Customer.Remove(customerquery);
                            context.SaveChanges();
                            Console.WriteLine($"Customer ID {id} removed successfully");
                        }
                    }
                    else {
                        Console.WriteLine("Customer does not exist");
                    }
                }
                catch (Exception)
                {
                    Console.WriteLine("Unable to delete Customer.");
                }
            }
        }
    }
}