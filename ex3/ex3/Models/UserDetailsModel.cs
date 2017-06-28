using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace ex3.Models
{
    public class UserDetailsModel
    {
        [Key]
        public string Name { get; set; }
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public int Wins { get; set; }
        public int Loses { get; set; }
        public int Record
        {
            get {
                if((this.Wins - this.Loses) < 0)
                    return 0;
                return this.Wins - this.Loses;
            }
            set { }
        }
    }
}