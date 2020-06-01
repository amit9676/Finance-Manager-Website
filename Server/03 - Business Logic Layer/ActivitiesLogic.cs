using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceServer
{
    public class ActivitiesLogic : BaseLogic
    {
        public List<ActivitiesDTO> GetAllActivites()
        {
            var q = from t in DB.TransActions
                    select new ActivitiesDTO
                    {
                        id = t.ActivityID,
                        typeOfAction = t.Activity_Type,
                        date = t.Date_of_Activity,
                        value = t.Value_of_Activity,
                        description = t.Description_of_Activity,
                        typeOfExpense = t.Type_Of_Expense
                    };

            return q.ToList();
        }

        public ActivitiesDTO AddActivity(ActivitiesDTO activity)
        {
            TransAction transAction = new TransAction
            {
                Activity_Type = activity.typeOfAction,
                Date_of_Activity = activity.date,
                Value_of_Activity = activity.value,
                Description_of_Activity = activity.description,
                Type_Of_Expense = activity.typeOfExpense
            };

            DB.TransActions.Add(transAction);
            DB.SaveChanges();
            activity.id = transAction.ActivityID;
            return activity;
        }

        public ActivitiesDTO EditActivity(ActivitiesDTO activity)
        {
            TransAction actionToEdit = DB.TransActions.Where(p => p.ActivityID == activity.id).SingleOrDefault();

            if (actionToEdit == null)
                return null;

            actionToEdit.Activity_Type = activity.typeOfAction;
            actionToEdit.Date_of_Activity = activity.date;
            actionToEdit.Value_of_Activity = activity.value;
            actionToEdit.Description_of_Activity = activity.description;
            actionToEdit.Type_Of_Expense = activity.typeOfExpense;
            DB.SaveChanges();
            return activity;
        }

        public void DeleteActivity(int id)
        {
            TransAction actionToDelete = DB.TransActions.Where(p => p.ActivityID == id).SingleOrDefault();

            if (actionToDelete != null)
            {
                DB.TransActions.Remove(actionToDelete);
                DB.SaveChanges();
            }
        }
    }
}
