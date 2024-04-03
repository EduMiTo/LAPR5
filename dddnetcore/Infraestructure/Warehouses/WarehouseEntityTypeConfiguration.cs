using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Warehouses;
using DDDSample1.Domain.Deliveries;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace DDDSample1.Infrastructure.Warehouses
{
    internal class WarehouseEntityTypeConfiguration : IEntityTypeConfiguration<Warehouse>
    {
        public void Configure(EntityTypeBuilder<Warehouse> builder)
        {
            builder.ToTable("Warehouses", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasConversion(v => v.value, v => new WarehouseId(v));
            builder.HasIndex(b => b.Address).IsUnique();
            builder.Property(b => b.Address).HasConversion(v => v.Value, v => new Address(v));
            builder.OwnsOne(b => b.Designation);
            builder.HasIndex(b => new { b.Latitude, b.Longitude }).IsUnique();
            builder.Property(b => b.Latitude).HasConversion(v => v.latitude, v => new Latitude(v));
            builder.Property(b => b.Longitude).HasConversion(v => v.longitude, v => new Longitude(v));
            builder.OwnsOne(b => b.Altitude);
            builder.Property(b => b.Active).HasColumnName("Active");
        }
    }
}