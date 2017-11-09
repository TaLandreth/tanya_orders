using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using orders_library.Services;
using orders_library;

namespace ordersAPI.Controllers
{
    //Login:
    [Route("api/login")]
    public class LoginController : Controller
    {
        [HttpPost]
        public IActionResult Post([FromBody]UserModel credentials)
        {

            if (credentials == null)
            {
                return BadRequest();
            }

            var user = new OrderManager().Login(credentials);

            if (user != null) { return new ObjectResult(user); }

            else
            {
                Console.WriteLine("Failed to login user: {0}", credentials.username);
                return Unauthorized();
            }
        }
    }

    //Retrieval - orders
    [Route("api/orders")]
    public class OrdersController : Controller
    {

        // GET DETAILS ABOUT ORDERS
        [HttpPost]
        public IActionResult RetrieveOrders([FromBody] Instructions instructions)
        {

            if (instructions.userid == 0)
            {
                return BadRequest();
            }


            var retrieval = new OrderManager().GetCustomerOrders(instructions);

            if(retrieval != null){ return new ObjectResult(retrieval);}
            else{
                Console.WriteLine("Failed to get orders...");
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public int GetOrderCount(int id)
        {
            Console.WriteLine($"Customer ID passed: {id}");

            var retrieval = new OrderManager().GetOrderCount(id);

            if (retrieval > 0) { return retrieval; }

            else { return 0; }
        }

    }



    //Retrieval - orders
    [Route("api/ordernumber")]
    public class RetrieveOrderById : Controller
    {
        
        [HttpPost("{id}")]
        public OneOrder GetOrder(int id)
        {

            if (id == 0)
            {
                return null;
            }

            var retrieval = new OrderManager().GetOrder(id);

            if (retrieval != null) { 

                return retrieval; 
            }
            else
            {
                Console.WriteLine("Failed to get orders...");
                return null;
            }
        }

    }


    //CANCEL order
    [Route("api/ordercancel")]
    public class OrderCancelController : Controller
    {

        // GET api/values
        [HttpPost("{id}")]
        public IActionResult CancelOrder(int id)
        {

            if (id == 0)
            {
                return BadRequest();
            }

            var retrieval = new OrderManager().CancelOrder(id);

            if (retrieval != null) { return new ObjectResult(retrieval); }

            else{
                Console.WriteLine("Failed cancel order...");
                return BadRequest();
            }
        }



    }

    //CREATE order
    [Route("api/ordernew")]
    public class OrderNewController : Controller
    {

        // GET api/values
        [HttpPost]
        public IActionResult CreateOrder([FromBody] NewOrderDetails orderdetails)
        {
            //CHECK IF NULL - RETURN BAD REQUEST
            if (orderdetails == null)
            {
                return BadRequest();
            }

            var retrieval = new OrderManager().CreateOrder(orderdetails);

            if (retrieval != null) { return new ObjectResult(retrieval); }

            else
            {
                Console.WriteLine("Unable to create order...");
                return BadRequest();
            }

        }

    }

    //Retrieval - PRODUCTS
    [Route("api/products")]
    public class ProductController : Controller
    {
        [HttpPost]
        public IActionResult RetrieveProducts([FromBody] Instructions instructions)
        {
            var retrieval = new ProductManager().GetProducts(instructions);

            Console.WriteLine($"Retrieved {retrieval.Count()} products");

            if (retrieval != null)
            {
                return new ObjectResult(retrieval);

            }

            else
            {
                Console.WriteLine("Failed to retrieve products...");
                return BadRequest();
            }
        }

        [HttpGet]
        public int GetProductCount()
        {
            var retrieval = new ProductManager().GetProductCount();


            if (retrieval > 0) { return retrieval; }

            else { return 0; }

        }
    }
}
