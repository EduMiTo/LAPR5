using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Deliveries;
using DDDSample1.Infrastructure.Warehouses;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Warehouses;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System;

namespace DDDSample1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DDDSample1DbContext>(opt =>
                opt.UseMySql(Configuration.GetConnectionString("OtherConnection"), 
                        new MySqlServerVersion(new Version(10, 7, 3)),
                        o => o.SchemaBehavior(MySqlSchemaBehavior.Ignore))
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            var optionsBuilder = new DbContextOptionsBuilder<DDDSample1DbContext>();
            optionsBuilder.UseMySql(Configuration.GetConnectionString("OtherConnection"),
                        new MySqlServerVersion(new Version(10, 7, 3)),
                        o => o.SchemaBehavior(MySqlSchemaBehavior.Ignore));


            using (var dbContext = new DDDSample1DbContext(optionsBuilder.Options))
            {
                dbContext.Database.EnsureCreated();
            }

            ConfigureMyServices(services);
            
           // services.AddCors(option => option.AddPolicy("AllowSpecificOrigin", policy => policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod()));

            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

        
            app.UseHttpsRedirection();

            app.UseRouting();

            string[] allowedOrigins = new string[] { "http://localhost:4200", "https://eletric-go.azurewebsites.net", "http://vs705.dei.isep.ipp.pt" };
            app.UseCors(options => options.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork,UnitOfWork>();

            services.AddTransient<IDeliveryRepository,DeliveryRepository>();
            services.AddTransient<DeliveryService>();

            services.AddTransient<IWarehouseRepository,WarehouseRepository>();
            services.AddTransient<WarehouseService>();

        }
    }
}
