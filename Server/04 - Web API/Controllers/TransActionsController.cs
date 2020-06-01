using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FinanceServer
{
    [EnableCors("*", "*", "*")]
    public class TransActionsController : ApiController
    {

        private ActivitiesLogic logic = new ActivitiesLogic();



        [HttpGet]
        [Route("api/activites")]
        public HttpResponseMessage getAllActivites()
        {
            try
            {
                List<ActivitiesDTO> activites = logic.GetAllActivites();
                return Request.CreateResponse(HttpStatusCode.OK, activites);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse
                    (HttpStatusCode.InternalServerError,
                    ErrorManager.GetInnerMessage(ex));
            }
        }

        [HttpPost]
        [Route("api/activites")]
        public HttpResponseMessage AddActivity(ActivitiesDTO activity)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorManager.GetErrors(ModelState));
                }
                else
                {
                    ActivitiesDTO addedActivity = logic.AddActivity(activity);
                    return Request.CreateResponse(HttpStatusCode.Created, addedActivity);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse
                    (HttpStatusCode.InternalServerError,
                    ErrorManager.GetInnerMessage(ex));
            }
        }

        [HttpPut]
        [Route("api/activites/{id}")]
        public HttpResponseMessage EditActivity(ActivitiesDTO activity, int id)
        {
            try
            {
                activity.id = id;
                ActivitiesDTO Editedactivity = logic.EditActivity(activity);
                if (Editedactivity == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
                return Request.CreateResponse(HttpStatusCode.OK, Editedactivity);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse
                    (HttpStatusCode.InternalServerError,
                    ErrorManager.GetInnerMessage(ex));
            }
        }

        [HttpDelete]
        [Route("api/activites/{id}")]
        public HttpResponseMessage DeleteActivity(int id)
        {
            try
            {
                logic.DeleteActivity(id);
                return Request.CreateResponse(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(
                    HttpStatusCode.InternalServerError,
                    ErrorManager.GetInnerMessage(ex));
            }
        }
    }
}
