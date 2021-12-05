using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IProductRepository ProductRepository { get; }
        IBasketRepository BasketRepository { get; }
        Task<bool> Complete();
    }
}