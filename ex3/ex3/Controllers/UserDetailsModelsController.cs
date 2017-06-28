using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ex3.Models;
using System.Threading.Tasks;

namespace ex3.Controllers
{
    public class UserDetailsModelsController : ApiController
    {
        private ex3Context db = new ex3Context();

        // GET: api/UserDetailsModels
        public IQueryable<UserDetailsModel> GetUserDetailsModels()
        {
            return db.UserDetailsModels.OrderByDescending(player => player.Record);
        }

        // GET: api/UserDetailsModels/5
        [HttpGet]
        [ResponseType(typeof(UserDetailsModel))]
        public IHttpActionResult GetUserDetailsModel(string userName)
        {
            UserDetailsModel userDetailsModel = db.UserDetailsModels.Find(userName);
            if (userDetailsModel == null)
            {
                return NotFound();
            }

            return Ok(userDetailsModel);
        }

        
        [HttpGet]
        [Route("api/UserDetailsModels/UpdateLost/{userName}")]
        public IHttpActionResult UpdateLost(string userName)
        {
            UserDetailsModel userDetailsModel = db.UserDetailsModels.Find(userName);
            if (userDetailsModel == null)
            {
                return NotFound();
            }

            userDetailsModel.Loses++;

            this.PutUserDetailsModel(userName, userDetailsModel);

            return Ok(userDetailsModel);
        }

        // GET: api/UserDetailsModels/5
        [HttpGet]
        [Route("api/UserDetailsModels/UpdateWon/{userName}")]
        public IHttpActionResult UpdateWon(string userName)
        {
            UserDetailsModel userDetailsModel = db.UserDetailsModels.Find(userName);
            if (userDetailsModel == null)
            {
                return NotFound();
            }

            userDetailsModel.Wins++;

            this.PutUserDetailsModel(userName, userDetailsModel);

            return Ok(userDetailsModel);
        }


        // PUT: api/UserDetailsModels/
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserDetailsModel(string userName, UserDetailsModel user)
        {

            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (userName != user.Name)
                return BadRequest();
            db.Entry(user).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/UserDetailsModels/
        [ResponseType(typeof(UserDetailsModel))]
        [ActionName("RealPost")]
        public async Task<IHttpActionResult> PostUserDatabase(UserDetailsModel userDatabase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserDetailsModels.Add(userDatabase);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = userDatabase.Name }, userDatabase);
        }


        // DELETE: api/UserDetailsModels/5
        [ResponseType(typeof(UserDetailsModel))]
        public IHttpActionResult DeleteUserDetailsModel(int id)
        {
            UserDetailsModel userDetailsModel = db.UserDetailsModels.Find(id);
            if (userDetailsModel == null)
            {
                return NotFound();
            }

            db.UserDetailsModels.Remove(userDetailsModel);
            db.SaveChanges();

            return Ok(userDetailsModel);
        }

        private bool UserExists(UserDetailsModel user)
        {
            foreach (UserDetailsModel u in db.UserDetailsModels)
            {
                if (u.Name == user.Name)
                {
                    return true;
                }
            }
            return false;
        }

        // GET: api/UserDatabases/5
        [HttpGet]
        [ResponseType(typeof(string))]
        [Route("api/UserDetailsModels/CheckIfExists/{userName}")]
        public string CheckIfExists(string userName)
        {
            if (db.UserDetailsModels.Count(e => e.Name == userName) > 0)
            {
                return "exist";
            }
            else
            {
                return "notExists";
            }
        }

    }
}