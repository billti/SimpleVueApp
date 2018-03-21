using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SimpleVueApp
{
    public class IndexModel : PageModel
    {
        public string Heading { get; set; }
        public void OnGet()
        {
            Heading = "Welcome to my site";
        }
    }
}