using DDDSample1.Domain.Warehouses;
using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryMapper
    {
        public static DeliveryDto domainToDTO(Delivery del)
        {
            return new DeliveryDto
            {
                Id = del.Id.value,
                weight = del.weight.weight,
                limitDate = del.limitDate.limitDate.ToShortDateString(),
                unloadTime = del.timeUnloadTruck.timeTruck,
                loadTime = del.timeLoadTruck.timeTruck,
                warehouse = del.warehouseId.value
            };
        }

        public static Delivery dtoToDomain(DeliveryDto del)
        {
            return new Delivery(del.Id, del.weight, del.limitDate, del.unloadTime, del.loadTime, del.warehouse);
        }
        
    }
}