using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EFSOL_TestApp.Context;
using EFSOL_TestApp.Models;
using System.IO;

namespace EFSOL_TestApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnswersController : Controller
    {
        private readonly QuestionnaireContext _context;

        public AnswersController(QuestionnaireContext context)
        {
            // To init database withTest data do this
            //foreach (var q in Question.Init())
            //{
            //    context.Add(q);
            //}
            //context.SaveChanges();
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Question> Get()
        { 
            return _context.Questions.ToList();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Submit(int id)
        {
            Stream req = Request.Body;
            req.Seek(0, System.IO.SeekOrigin.Begin);
            string json = new StreamReader(req).ReadToEnd();

            return null;
        }
    }
}
