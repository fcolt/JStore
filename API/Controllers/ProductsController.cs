using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;
        public ProductsController(IUnitOfWork unitOfWork, StoreContext context, IMapper mapper, ImageService imageService)
        {
            _imageService = imageService;
            _mapper = mapper;
            _context = context;
            _unitOfWork = unitOfWork;
        }

        [HttpGet] 
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var products = await _unitOfWork.ProductRepository.GetProductsAsync(productParams);

            Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetProductAsync(id);

            if(product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _unitOfWork.ProductRepository.GetFilter("Brand");
            var types = await _unitOfWork.ProductRepository.GetFilter("Type");

            return Ok(new {brands, types});
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm]CreateProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);

            if (productDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDto.File);

                if (imageResult.Error != null) 
                    return BadRequest(new ProblemDetails{Title = imageResult.Error.Message});

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            _context.Products.Add(product);

            var result = await _unitOfWork.Complete();
            
            if (result) return CreatedAtRoute("GetProduct", new {Id = product.Id}, product);

            return BadRequest(new ProblemDetails {Title = "Problem creating new product"});
        }

        //[Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult> UpdateProduct(UpdateProductDto productDto)
        {
            var product = await _context.Products.FindAsync(productDto.Id);

            if (product == null) return NotFound();
            
            _mapper.Map(productDto, product);

            var result = await _unitOfWork.Complete();

            if (result) return NoContent();

            return BadRequest(new ProblemDetails {Title = "Problem updating product"});
        }

        //[Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            _context.Products.Remove(product);

            var result = await _unitOfWork.Complete();

            if (result) return Ok();

            return BadRequest(new ProblemDetails {Title = "Problem removing product"});
        }   
    }
}