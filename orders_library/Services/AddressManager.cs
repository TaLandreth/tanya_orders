using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace orders_library.Services
{
    public class AddressManager
    {
        //RETRIEVE
        public List<Address> GetAddress(int custnum) //by CUSTOMER ID#
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                    List<Address> addressDetails = new List<Address>();

                    //RETRIEVE BY CUSTOMER NUMBER
                    var query = from Address a in context.Address
                    where a.CustomerDetails.Id == custnum
                    select a;
   
                    Console.WriteLine(query.Count());

                    foreach(Address addr in query)
                    {
                        Console.WriteLine($"Customer ID: {addr.CustomerDetails.Id}");
                        //Console.WriteLine($"Customer ID: {addr.CustomerDetails.Id}");
                        Console.WriteLine($"Address ID #: {addr.Id}");
                        Console.WriteLine($"Address Type: {addr.Addresstype}");
                        Console.WriteLine($"Street #: {addr.Street}");

                        addressDetails.Add(addr);
                    }

                    return addressDetails;
                }
                catch(Exception)
                {
                    Console.WriteLine("Unable to retrieve addresses.");
                    return null;
                }
            }
        }

        //CREATE
        public void CreateAddress(Address address)
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                    context.Address.Add(address);
                    context.SaveChanges();
                }
                catch(Exception){
                    Console.WriteLine("Unable to add address.");
                }
            }
        }

        //REMOVE
        public void RemoveAddress(int id)
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                    var addr = context.Address.FirstOrDefault(a => a.Id == id);
                    if (addr.Id == id)
                    {
                        context.Address.Remove(addr);
                        context.SaveChanges();
                    }
                }
                catch (Exception)
                {
                    Console.WriteLine("Unable to delete.");
                }

            }
        }

        //UPDATE
        public void UpdateAddress(Address address)
        {
            using (var context = DbContextFactory.Create())   //no 'NEW' b/c of static class
            {
                try
                {
                   var addr = context.Address.FirstOrDefault(a => a.Id == address.Id);

                    Console.WriteLine($"Passed Address ID {address.Id}");
                    Console.WriteLine($"Queried Address ID {addr.Id}");

                    addr.CustomerDetails.Id = address.CustomerDetails.Id;
                    addr.Addresstype = address.Addresstype;
                    addr.Street = address.Street;
                    addr.City = address.City; 
                    addr.State = address.State;
                    addr.Zip = address.Zip;

                    if (addr.Id == address.Id)
                    {
                        context.Entry(addr).State = EntityState.Modified;
                        context.SaveChanges();

                        Console.WriteLine($"Address ID# {address.Id} updated successfully.");
                    }
                }
                catch (Exception)
                {
                    Console.WriteLine("Unable to update.");
                }

            }
        }
    }
}

