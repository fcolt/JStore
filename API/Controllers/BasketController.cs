using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        public BasketController(StoreContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context; 
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            return _mapper.Map<BasketDto>(basket);
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();

            if (basket == null) basket = CreateBasket(); 

            var product = await _context.Products.FindAsync(productId);

            if (product == null) return BadRequest(new ProblemDetails{Title = "Product not found"});

            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            
            if (result) return CreatedAtRoute("GetBasket", _mapper.Map<BasketDto>(basket));

            return BadRequest(new ProblemDetails{Title = "Problem saving item to basket"});
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();
            
            basket.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails{Title = "Problem removing item from basket"});
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket{BuyerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}