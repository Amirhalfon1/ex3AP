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

namespace ex3.Controllers
{
    public class UserDetailsModelsController : ApiController
    {
        private Ex3AppContext db = new Ex3AppContext();

        // GET: api/UserDetailsModels
        public IQueryable<UserDetailsModel> GetUserDetailsModels()
        {
            return db.UserDetailsModels;
        }

        // GET: api/UserDetailsModels/5
        [ResponseType(typeof(UserDetailsModel))]
        public IHttpActionResult GetUserDetailsModel(int id)
        {
            UserDetailsModel userDetailsModel = db.UserDetailsModels.Find(id);
            if (userDetailsModel == null)
            {
                return NotFound();
            }

            return Ok(userDetailsModel);
        }

        // PUT: api/UserDetailsModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserDetailsModel(int id, UserDetailsModel userDetailsModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userDetailsModel.Id)
            {
                return BadRequest();
            }

            db.Entry(userDetailsModel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserDetailsModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/UserDetailsModels
        [ResponseType(typeof(UserDetailsModel))]
        public IHttpActionResult PostUserDetailsModel(UserDetailsModel userDetailsModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserDetailsModels.Add(userDetailsModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = userDetailsModel.Id }, userDetailsModel);
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

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserDetailsModelExists(int id)
        {
            return db.UserDetailsModels.Count(e => e.Id == id) > 0;
        }
    }
}