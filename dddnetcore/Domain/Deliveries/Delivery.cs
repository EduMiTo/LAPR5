using System;
using System.Linq;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Domain.Deliveries
{
    public class Delivery : Entity<DeliveryId>, IAggregateRoot
    {
     
        public DeliveryId Id { get; private set; }
        public LimitDate limitDate { get; private set; }

        public Weight weight{ get; private set; }

        //private int armazemDestino

        public TimeTruck timeLoadTruck {get; private set; }

        public TimeTruck timeUnloadTruck {get; private set; }

        public Warehouse warehouse { get; private set; }

        public WarehouseId warehouseId { get; private set; }

        public Delivery()
        {
            
        }

        public Delivery(int weight, string limitDate, int unloadTime, int loadTime, string warehouse)
        {
            this.Id = new DeliveryId(generateId());
            this.weight = new Weight(weight);

            this.limitDate = new LimitDate(limitDate);
            this.timeLoadTruck = new TimeTruck(loadTime);
            this.timeUnloadTruck = new TimeTruck(unloadTime);

            this.warehouseId = new WarehouseId(warehouse);
        }
        
        public Delivery(string id, int weight, string limitDate, int unloadTime, int loadTime, string warehouse)
        {
            this.Id = new DeliveryId(id);
            this.weight = new Weight(weight);

            this.limitDate = new LimitDate(limitDate);
            this.timeLoadTruck = new TimeTruck(loadTime);
            this.timeUnloadTruck = new TimeTruck(unloadTime);

            this.warehouseId = new WarehouseId(warehouse);
        }

        public void update(DeliveryDto deliveryDTO)
        {

            LimitDate date;
            if(deliveryDTO.limitDate != null)
            {
               date = new LimitDate(deliveryDTO.limitDate);
                if (date.limitDate != default(DateTime))
                    this.limitDate = new LimitDate(deliveryDTO.limitDate);
            }
            

            
            if (deliveryDTO.loadTime != default(float))
                this.timeLoadTruck = new TimeTruck(deliveryDTO.loadTime);

            if (deliveryDTO.unloadTime != default(float))
                this.timeUnloadTruck = new TimeTruck(deliveryDTO.unloadTime);

            if (deliveryDTO.warehouse != null)
                this.warehouseId = new WarehouseId(deliveryDTO.warehouse);

            if (deliveryDTO.weight != default(float))
                this.weight = new Weight(deliveryDTO.weight);
        }

        public string generateId()
        {

            string final = "";
            Random random = new Random();
            int fPartId = random.Next(100000, 999999);
            int lPartId = random.Next(1, 9);

            

            final+= (fPartId.ToString());

            final+=("/");

            final+=(lPartId.ToString());



            return final;
        }

    }
}