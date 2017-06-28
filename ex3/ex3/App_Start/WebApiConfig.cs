using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ex3
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "RealPost",
                routeTemplate: "api/{controller}/{action}/{userDatabase}",
                defaults: new { controller = "UserDetailsModelsController" }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
            name: "RealGet",
            routeTemplate: "api/{controller}/{action}/{userDatabase}",
            defaults: new { controller = "UserDetailsModelsController" }
            );

            //config.Routes.MapHttpRoute(
            //name: "LostGet",
            //routeTemplate: "api/{controller}/{action}/{userDatabase}",
            //defaults: new { controller = "UserDetailsModelsController" }
            //);

            //config.Routes.MapHttpRoute(
            //name: "WonGet",
            //routeTemplate: "api/{controller}/{action}/{userDatabase}",
            //defaults: new { controller = "UserDetailsModelsController" }
            //);

        }

    }
}
