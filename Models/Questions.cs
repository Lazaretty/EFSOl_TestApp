using System.Collections.Generic;

namespace EFSOL_TestApp.Models
{
    public class Question
    {
        public int Id { get; set; }
        public int QuestionnaireId { get; set; }
        public string QuestionText { get; set; }
        public string QuestionType { get; set; }


        public static List<Question> Init()
        {
            var result = new List<Question>();
            result.Add(new Question() { QuestionnaireId = 1,  QuestionText = "Введите имя", QuestionType="text" });
            result.Add(new Question() { QuestionnaireId = 1, QuestionText = "Введите возраст", QuestionType = "text" });
            result.Add(new Question() { QuestionnaireId = 1, QuestionText = "Введите пол", QuestionType = "drop" });
            result.Add(new Question() { QuestionnaireId = 1, QuestionText = "Введите дату рождения", QuestionType = "date" });
            result.Add(new Question() { QuestionnaireId = 1, QuestionText = "Введите семейное положение", QuestionType = "drop" });
            result.Add(new Question() { QuestionnaireId = 1, QuestionText = "Любите ли вы програмировать?", QuestionType = "radio" });

            return result;
        }
    }
}