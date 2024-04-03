using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Warehouses;
using DDDSample1.Infrastructure.Deliveries;
using DDDSample1.Infrastructure.Warehouses;

namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {
        public DbSet<Delivery> Deliveries { get; set; }

        public DbSet<Warehouse> Warehouses { get; set; }


        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           // base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new DeliveryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new WarehouseEntityTypeConfiguration());
        }
    }
}