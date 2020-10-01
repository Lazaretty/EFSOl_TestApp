using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EFSOL_TestApp.Context;
using EFSOL_TestApp.Models;

namespace EFSOL_TestApp.Controllers
{
    public class DropMenuDatasController : Controller
    {
        private readonly QuestionnaireContext _context;

        public DropMenuDatasController(QuestionnaireContext context)
        {
            _context = context;
        }

        public IEnumerable<DropMenuData> Index()
        {
            return _context.DropMenuData.ToList();
        }
    }
}