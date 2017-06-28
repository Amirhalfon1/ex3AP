namespace ex3.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserDetailsModels",
                c => new
                    {
                        Name = c.String(nullable: false, maxLength: 128),
                        Email = c.String(),
                        Password = c.String(nullable: false),
                        Wins = c.Int(nullable: false),
                        Loses = c.Int(nullable: false),
                        Record = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Name);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.UserDetailsModels");
        }
    }
}
