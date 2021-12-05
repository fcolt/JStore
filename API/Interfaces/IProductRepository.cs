using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.RequestHelpers;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> GetProductAsync(int id);
        Task<PagedList<Product>> GetProductsAsync(ProductParams productParams);
        Task<List<string>> GetFilter(string productParam);
    }
}