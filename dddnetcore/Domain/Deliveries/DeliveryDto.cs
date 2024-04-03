using DDDSample1.Domain.Warehouses;
using System;

namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryDto
    {
        public string Id { get; set; }
        public int weight { get; set; }

        public string limitDate { get; set; }

        public int loadTime { get; set; }

        public int unloadTime { get; set; }

        public string warehouse { get; set; }





    }
}