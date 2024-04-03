using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Infrastructure.Deliveries
{
    internal class DeliveryEntityTypeConfiguration : IEntityTypeConfiguration<Delivery>
    {
        public void Configure(EntityTypeBuilder<Delivery> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            
            
            builder.ToTable("Deliveries", SchemaNames.DDDSample1);
            
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasConversion(v => v.value, v => new DeliveryId(v));
            builder.OwnsOne(b => b.limitDate);
            builder.OwnsOne(b => b.timeLoadTruck);
            builder.OwnsOne(b => b.timeUnloadTruck);
            builder.OwnsOne(b => b.weight);
            builder.HasOne(b => b.warehouse).WithMany().HasForeignKey(b => b.warehouseId);
            builder.Property(b => b.warehouseId).HasConversion(v => v.value, v => new WarehouseId(v));

            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}