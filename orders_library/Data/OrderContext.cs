﻿namespace ordersAPI
{
    using System.ComponentModel.DataAnnotations;
    using Microsoft.EntityFrameworkCore;
    using ordersAPI.Models;

    public class OrderDBContext : DbContext
    {
        public OrderDBContext(DbContextOptions<OrderDBContext> options)
        : base(options)
        { }

        public DbSet<Address> Address { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<LineItem> LineItem { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ShippingMethod> ShippingMethod { get; set; }
        public DbSet<UserModel> UserDetails { get; set; }
    }

    public static class DbContextFactory
    {
        private static string _connectionString = "server=localhost;user id=root;password=Silver34;port=3306;database=tanya_db;SslMode=none;";

        public static OrderDBContext Create()
        {
            var optionsBuilder = new DbContextOptionsBuilder<OrderDBContext>();
            optionsBuilder.UseMySQL(_connectionString);

            //Ensure database creation
            var context = new OrderDBContext(optionsBuilder.Options);
            context.Database.EnsureCreated();

            return context;
        }

}}