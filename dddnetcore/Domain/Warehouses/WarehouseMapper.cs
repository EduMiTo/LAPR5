using System;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseMapper
    {
        public static WarehouseDto domainToDTO(Warehouse warehouse)
        {
            return new WarehouseDto
            {
                Id = warehouse.Id.value,
                Designation = warehouse.Designation.designation,
                Address = warehouse.Address.Value,
                Latitude = warehouse.Latitude.latitude,
                Longitude = warehouse.Longitude.longitude,
                Altitude = warehouse.Altitude.altitude,
                Principal = warehouse.Principal
            };
        }

        public static Warehouse dtoToDomain(WarehouseDto warehouse)
        {
            return new Warehouse(warehouse.Id, warehouse.Designation, warehouse.Address, warehouse.Latitude, warehouse.Longitude, warehouse.Altitude);
        }
    }
}
