using System;
using System.Threading;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Domain.Warehouses
{
    public class Warehouse : Entity<WarehouseId>, IAggregateRoot
    {

        public WarehouseId Id { get;  set; }

        public Designation Designation { get; private set; }

        public Address Address { get;  private set; }

        public Latitude Latitude { get; private set; }

        public Longitude Longitude { get; private set; }
        public Altitude Altitude { get; private set; }

        public bool Principal {get; private set; }

        public bool Active { get;  private set; }


        public Warehouse()
        {
            this.Active = true;
        }


        public Warehouse(string id,string designation, string address, double latitude, double longitude, double altitude)
        {
           
            this.Id = new WarehouseId(id);
            this.Designation = new Designation(designation);
            this.Address = new Address(address);
            this.Latitude = new Latitude(latitude);
            this.Longitude = new Longitude(longitude);
            this.Altitude = new Altitude(altitude);

            if (designation.Equals("Matosinhos"))
                this.Principal = true;
            else
                this.Principal = false;

            this.Active = true;
        }

        public void update(WarehouseDto warehouseDto)
        {
            if (warehouseDto.Designation!= default(string))
                this.Designation = new Designation(warehouseDto.Designation);

            if (warehouseDto.Designation == "Matosinhos"){

                this.Principal = true;
            }
            else if (warehouseDto.Designation != null) {
                this.Principal = false;
                this.Designation = new Designation(warehouseDto.Designation);
            }

            if (warehouseDto.Address != null)
                this.Address = new Address(warehouseDto.Address);

            if (warehouseDto.Latitude != default(double))
                this.Latitude = new Latitude(warehouseDto.Latitude);

            if (warehouseDto.Longitude != default(double))
                this.Longitude = new Longitude(warehouseDto.Longitude);

            if (warehouseDto.Altitude != default(double))
                this.Altitude = new Altitude(warehouseDto.Altitude);
            
            this.Active = warehouseDto.Active;

        }

        public void MarkAsInative()
        {
            this.Active = false;
        }

    }
}