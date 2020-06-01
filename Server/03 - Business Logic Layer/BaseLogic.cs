using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceServer
{
    public class BaseLogic : IDisposable
    {
        protected FinanceActivitiesEntities DB = new FinanceActivitiesEntities();

        public void Dispose()
        {
            DB.Dispose();
        }
    }
}
