using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShortURL.Model
{
    public class url
    {
        public int id { get; set; }
        public string longUrl { get; set; }
        public string shortUrl { get; set; }
        public DateTime? createdDate { get; set; }
        public int countLink { get; set; }

        public void clone(url source)
        {
            this.id = source.id;
            this.longUrl = source.longUrl;
            this.shortUrl = source.shortUrl;
            this.createdDate = source.createdDate;
            this.countLink = source.countLink;
        }
    }
    public class UrlContext : DbContext
    {   
        public DbSet<url> urls { get; set; }        
        public UrlContext(DbContextOptions options)
                : base(options)
        {
        }
    }
}
