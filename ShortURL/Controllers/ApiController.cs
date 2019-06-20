using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShortURL.Model;

namespace ShortURL.Controllers
{
    [Route("[controller]")]
    public class ApiController : Controller
    {

        private readonly UrlContext urlContext;
        public ApiController(UrlContext urlContext)
        {
            this.urlContext = urlContext;
        }
        private void generateShorUrl(url _url)
        {
            try
            {
                int firsChar;
                string code = "";
                Random random = new Random(DateTime.Now.Second);
                firsChar = random.Next() % 8 + 1;
                code = Guid.NewGuid().ToString("n").Substring(0, 4);
                int ind = 0;
                while (this.urlContext.urls.FirstOrDefault(x => x.shortUrl.Equals(firsChar.ToString() + code)) != null && ind < 9)
                {
                    firsChar = (firsChar + 1) % 8 + 1;
                    ind++;
                }

                _url.shortUrl = firsChar.ToString() + code;
            }
            catch (Exception ex)
            {

            }
        }

        [Route("all")]
        [HttpGet]
        public IEnumerable<url> All()
        {
            return this.urlContext.urls;
        }

        [Route("delete/{id?}")]
        [HttpGet]
        public int Delete(int? id)
        {
            try
            {
                if (id == null)
                {
                    throw new Exception();
                }
                url url_ = this.urlContext.urls.Find(id);
                if (url_ != null)
                {
                    this.urlContext.urls.Remove(url_);
                    this.urlContext.SaveChanges();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }

        [Route("details/{id?}")]
        [HttpGet]
        public url Details(int id)
        {
            try
            {
                //System.Diagnostics.Debugger.Launch();
                // реализовать вcё таки через  отдельный класс
                return this.urlContext.urls.Find(id);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [Route("edit")]
        [HttpPut]
        public int Edit(url url_)
        {
            try
            {
                this.urlContext.Entry(url_).State = EntityState.Modified;
                this.urlContext.SaveChanges();
                return 1;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [Route("create")]
        [HttpPost]
        public int Create(url _url)
        {
            try
            {
                if (_url.createdDate == null)
                {
                    _url.createdDate = DateTime.Now;
                }
                generateShorUrl(_url);
                this.urlContext.urls.Add(_url);
                this.urlContext.SaveChanges();
                return _url.id;
            }
            catch
            {
                throw;
            }
        }
    }
}