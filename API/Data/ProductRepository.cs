using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.RequestHelpers;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;
        public ProductRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<Product> GetProductAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<PagedList<Product>> GetProductsAsync(ProductParams productParams)
        {
            var query = _context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();
            
            return await PagedList<Product>.ToPagedListAsync(query, productParams.PageNumber, productParams.PageSize);
        }

        public async Task<List<string>> GetFilter(string productParam)
        {
            var query = productParam == "Brand" ? await _context.Products.Select(p => p.Brand).Distinct().ToListAsync() 
                : await _context.Products.Select(p => p.Type).Distinct().ToListAsync();
            
            return query;
        }
    }
}