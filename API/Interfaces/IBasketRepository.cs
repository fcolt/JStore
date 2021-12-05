using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Http;

namespace API.Interfaces
{
    public interface IBasketRepository
    {
        Task<Basket> RetrieveBasketAsync(HttpRequest request);
        Basket CreateBasket(HttpResponse response);
    }
}