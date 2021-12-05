using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public BasketController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await _unitOfWork.BasketRepository.RetrieveBasketAsync(Request);

            if (basket == null) return NotFound();

            return _mapper.Map<BasketDto>(basket);
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await _unitOfWork.BasketRepository.RetrieveBasketAsync(Request);

            if (basket == null) basket = _unitOfWork.BasketRepository.CreateBasket(Response); 

            var product = await _unitOfWork.ProductRepository.GetProductAsync(productId);

            if (product == null) return BadRequest(new ProblemDetails{Title = "Product not found"});

            basket.AddItem(product, quantity);

            var result = await _unitOfWork.Complete();
            
            if (result) return CreatedAtRoute("GetBasket", _mapper.Map<BasketDto>(basket));

            return BadRequest(new ProblemDetails{Title = "Problem saving item to basket"});
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await _unitOfWork.BasketRepository.RetrieveBasketAsync(Request);

            if (basket == null) return NotFound();
            
            basket.RemoveItem(productId, quantity);

            var result = await _unitOfWork.Complete();

            if (result) return Ok();

            return BadRequest(new ProblemDetails{Title = "Problem removing item from basket"});
        }
    }
}