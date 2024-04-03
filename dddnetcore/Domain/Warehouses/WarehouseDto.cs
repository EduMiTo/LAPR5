using System;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseDto
    {
        public string Id { get; init; }
        public string Designation { get;  init; }

        public string Address { get;  init; }

        public double Latitude { get;  init; }

        public double Longitude { get;  init; }
        public double Altitude { get;  init; }

        public bool Principal {get; init;}
        public bool Active {get; init;}
    }
}