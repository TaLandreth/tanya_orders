using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace orders_library.Services
{
    public class LineItemManager
    {
        //RETRIEVE
        public void GetLineItem(int id) //by line id
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                //RETRIEVE BY id
                var query = from LineItem l in context.LineItem
                            where l.Id == id     //remove this line to retireve all
                            select l;
                try
                {
                    foreach (LineItem line in query)
                    {
                        Console.WriteLine($"\tLine ID: {line.Id}");
                        Console.WriteLine($"\tProduct: {line.ProductDetails}");
                        //Console.WriteLine($"\tOrder ID: {line.OrderDetailsId}");
                        Console.WriteLine($"\tQty: {line.Quantity}");
                        Console.WriteLine($"\tDiscount: {line.Discount}");
                    }
                }
                catch (Exception)
                {
                    Console.WriteLine("No line item found.");
                }
            }
        }

        //UPDATE
        public void UpdateLineItem(LineItem updatedLine)
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                    //Locate customer
                    var query = context.LineItem.FirstOrDefault(a => a.Id == updatedLine.Id);

                    //Console.WriteLine($"Passed Line ID {updatedLine.Id}");
                    //Console.WriteLine($"Queried Line ID {query.Id}");

                    //Update:
                    query.ProductDetails = updatedLine.ProductDetails;
                    query.Quantity = updatedLine.Quantity;
                    //query.OrderDetailsId = updatedLine.OrderDetailsId;
                    query.Discount = updatedLine.Discount;

                    //If Id matches...
                    if (query.Id == updatedLine.Id)
                    {
                        context.Entry(query).State = EntityState.Modified;
                        context.SaveChanges();
                        Console.WriteLine($"Line ID# {updatedLine.Id} updated successfully.");
                    }
                }
                catch (Exception)
                {
                    Console.WriteLine("\t** Unable to update Line.");
                }
            }
        }

        //CREATE
        public void CreateLineItem(LineItem line)
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                    context.LineItem.Add(line);
                    context.SaveChanges();
                    //Console.WriteLine($"\nNew line {line.Id} added to Order #{line.OrderDetailsId}.");
                }
                catch (Exception)
                {
                    Console.WriteLine("\t*** Unable to add line....");
                }
            }
        }

        //REMOVE
        public void RemoveLineItem(int id) 
        {

            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {

                    //Locate line id with line id = id passed
                    var linequery = context.LineItem.FirstOrDefault(x => x.Id == id);
                try
                {
                    //Chec if the queried ID = passed id
                    if (linequery == null)
                    {
                        Console.WriteLine("Line does not exist");
                    }
                    else if (linequery.Id == id)
                    {
                            context.LineItem.Remove(linequery);
                            context.SaveChanges();
                            Console.WriteLine($"Line ID {id} removed successfully");
                    }
                }
                catch (Exception)
                {
                    Console.WriteLine("Unable to delete line.");
                }
            }
        }
    }
}