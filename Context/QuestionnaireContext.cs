using EFSOL_TestApp.Models;
using Microsoft.EntityFrameworkCore;

namespace EFSOL_TestApp.Context
{
    public class QuestionnaireContext : DbContext
    {
        public QuestionnaireContext(DbContextOptions<QuestionnaireContext> options) : base(options)
        {
        }

        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<DropMenuData> DropMenuData { get; set; }
    }
}
