using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace orders_library.Services
{
    public class ShipMethodManager
    {
        //RETRIEVE--------
        public ShippingMethod GetShipMethod(int id)
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                    //RETRIEVE BY method NAME
                    var query = context.ShippingMethod.FirstOrDefault(a => a.Id == id);
                    return query;
                }
                catch(Exception){
                    Console.WriteLine("Unable to locate shipping method.");
                    return null;
                }
            }
        }

        //UPDATE--------
        public void UpdateShipMethod(ShippingMethod updatedMethod)
        {
            using (var context = DbContextFactory.Create())
            {
                try
                {
                    var query = context.ShippingMethod.FirstOrDefault(a => a.Id == updatedMethod.Id);

                    query.Carrier = updatedMethod.Carrier;
                    query.Method = updatedMethod.Method;

                    if (query.Id == updatedMethod.Id)
                    {
                        context.Entry(query).State = EntityState.Modified;
                        context.SaveChanges();
                        Console.WriteLine($"Shipmethod ID# {updatedMethod.Id} updated successfully.");
                    }
                }
                catch (Exception)
                {
                    Console.WriteLine("Unable to update shipping method.");
                }
            }
        }

        //CREATE--------
        public void CreateShipMethod(ShippingMethod m)
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                    context.ShippingMethod.Add(m);
                    context.SaveChanges();
                    Console.WriteLine($"New method {m.Method} added.");
                }
                catch (Exception)
                {
                    Console.WriteLine("Unable to add shipping method.");
                }
            }
        }

        //REMOVE ***********************CONSTRAINTS************************************
        public void RemoveShipMethod(int id)
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                    var methd = context.ShippingMethod.FirstOrDefault(m => m.Id == id);

                    if (methd.Id == id)
                    {
                        //check for any orders that have method
                        var ord = context.OrderDetails.Select(o => o.Shipmethod.Id == id);
                        Console.WriteLine(ord.Count());

                        context.ShippingMethod.Remove(methd);
                        context.SaveChanges();

                        Console.WriteLine($"ShippingMethod ID {id} removed successfully");
                    }
                }
                catch (Exception)
                {
                    Console.WriteLine("Unable to delete shipping method.");
                }
            }
        }
    }
}

