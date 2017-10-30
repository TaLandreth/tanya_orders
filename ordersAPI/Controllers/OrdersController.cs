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

            if (user != null)
                return new ObjectResult(user);

            Console.WriteLine("Failed to login user: {0}", credentials.username);
            return Unauthorized();
        }
    }

    //Retrieval - orders
    [Route("api/orders")]
    public class OrdersController : Controller
    {
        
        // GET api/values
        [HttpPost]
        public IActionResult RetrieveOrders([FromBody] Instructions instructions)
        {
            var retrieval = new OrderManager().GetCustomerOrders(instructions);

            return new ObjectResult(retrieval);
        }

        [HttpGet]
        public int GetCount()
        {
            var retrieval = new OrderManager().GetOrderCount();

            return retrieval;

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

            Console.WriteLine("Failed to retrieve products...");
            return BadRequest();

        }

        [HttpGet]
        public int GetCount()
        {
            var retrieval = new ProductManager().GetCount();

            return retrieval;

        }



    }


}
