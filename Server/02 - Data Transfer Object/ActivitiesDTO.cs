using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace FinanceServer
{
    public class ActivitiesDTO
    {
        public int id { get; set; }

        [Required(ErrorMessage = "missing action")]
        public string typeOfAction { get; set; }

        [Required(ErrorMessage = "missing date")]
        public DateTime date { get; set; }

        [Required(ErrorMessage = "missing value")]
        [Range(1, Int32.MaxValue, ErrorMessage = "value must be above 0")]
        public decimal value { get; set; }

        public string description { get; set; }
        public string typeOfExpense { get; set; }
    }
}
