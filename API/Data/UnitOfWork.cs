using System.Threading.Tasks;
using API.Interfaces;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _context;
        private IProductRepository _productRepository;
        private IBasketRepository _basketRepository;
        public UnitOfWork(StoreContext context)
        {
            _context = context;
        }

        public IProductRepository ProductRepository 
        {
            get 
            {
                return _productRepository ??= new ProductRepository(_context);
            }
        }

        public IBasketRepository BasketRepository
        {
            get 
            {
                return _basketRepository ??= new BasketRepository(_context);
            }
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}