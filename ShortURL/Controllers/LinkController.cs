using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShortURL.Model;

namespace ShortURL.Controllers
{
    public class LinkController : Controller
    {
        private readonly UrlContext urlContext;
        public LinkController(UrlContext urlContext)
        {            
            this.urlContext = urlContext;
        }
        public IActionResult Index(string url)
        {
            // реализоывать обработку ошибок
            List<url> urls = new List<url>(this.urlContext.urls);
            url a = urls.Find(x => x.shortUrl.Equals(url));
            if (a != null && !string.IsNullOrEmpty(a.longUrl))
            {
                a.countLink++;
                this.urlContext.SaveChangesAsync();
                return Redirect(a.longUrl);
            }
            else
            {
                // выводить ошибку, что записи, к сожалени нет
                return Redirect("/");
            }
        }
    }
}