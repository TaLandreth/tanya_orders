using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ordersAPI.Models;

namespace ordersAPI.Controllers
{
    //Login:
    [Route("api/login")]
    public class LoginController : Controller
    {
        [HttpPost]
        public IActionResult Post([FromBody]UserModel credentials)
        {
            /*
            if (credentials == null)
            {
                return BadRequest();
            }

            var user = new StoreOrders().Login(credentials);

            if (user != null)
                return new ObjectResult(user);

            Console.WriteLine("Failed to login user: {0}", credentials.username);
            return Unauthorized();
            */
        }
    }

    //Retrieval
    [Route("api/orders")]
    public class OrdersController : Controller
    {
        /*
        // GET api/values
        [HttpGet]
        public IActionResult RetrieveOrders([FromBody]int num)
        {
            var retrieval = new StoreOrders().GetOrders(num);

            return new ObjectResult(retrieval);

        }
        */
    }
}
