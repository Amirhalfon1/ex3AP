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
    public class UserDetailsController : ApiController
    {
        private ex3Context db = new ex3Context();
        //
        // GET: api/UserDetails
       // public IQueryable<UserDetails> GetUserDetails()
       // {
       //     return db.UserDetails;
       //}

        // GET: api/UserDetails/5
        [ResponseType(typeof(UserDetails))]
        public IHttpActionResult GetUserDetails(int id)
        {
            UserDetails userDetails = db.UserDetails.Find(id);
            if (userDetails == null)
            {
                return NotFound();
            }

            return Ok(userDetails);
        }

        // PUT: api/UserDetails/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserDetails(int id, UserDetails userDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userDetails.Id)
            {
                return BadRequest();
            }

            db.Entry(userDetails).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserDetailsExists(id))
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

        // POST: api/UserDetails
        [ResponseType(typeof(UserDetails))]
        public IHttpActionResult PostUserDetails(UserDetails userDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserDetails.Add(userDetails);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = userDetails.Id }, userDetails);
        }

        // DELETE: api/UserDetails/5
        [ResponseType(typeof(UserDetails))]
        public IHttpActionResult DeleteUserDetails(int id)
        {
            UserDetails userDetails = db.UserDetails.Find(id);
            if (userDetails == null)
            {
                return NotFound();
            }

            db.UserDetails.Remove(userDetails);
            db.SaveChanges();

            return Ok(userDetails);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserDetailsExists(int id)
        {
            return db.UserDetails.Count(e => e.Id == id) > 0;
        }
    }
}