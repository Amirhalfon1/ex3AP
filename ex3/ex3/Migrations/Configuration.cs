namespace ex3.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ex3.Models.ex3Context>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ex3.Models.ex3Context context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
            context.UserDetailsModels.AddOrUpdate(
            new Models.UserDetailsModel
            {
                Name = "gal",
                Email = "gal@gal.com",
                Password = "123456",
                Wins = 0,
                Loses = 0,
                Record = 0
            }
            );
        }
    }
}
