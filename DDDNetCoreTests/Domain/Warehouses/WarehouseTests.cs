using DDDSample1.Domain.Warehouses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DDDSample1.Domain.Warehouses.Tests
{
    
    public class WarehouseTests
    {

        public string id = "P01";
        public string designation = "Porto";
        public string address = "Rua Santa Catarina,4400-300,Porto,Portugal,10";
        public double latitude = 10;
        public double longitude = 25;
        public double altitude = 10;
        public bool principal = false;

        [Test]
        public void WarehouseConstructorTest()
        {
            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, this.altitude);

            Assert.IsNotNull(warehouse);    
        }

        [Test]
        public void WarehouseConstructorIdTest()
        {
            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, this.altitude);

            Assert.That(warehouse.Id.Value, Is.EqualTo(this.id));
        }

        [Test]
        public void WarehouseConstructorDesignationTest()
        {
            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, this.altitude);

            Assert.That(warehouse.Designation.designation, Is.EqualTo(this.designation));
        }

        [Test]
        public void WarehouseConstructorAddressTest()
        {
            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, this.altitude);

            Assert.That(warehouse.Address.Value, Is.EqualTo(this.address));
        }

        [Test]
        public void WarehouseConstructorLatitudeTest()
        {
            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, this.altitude);

            Assert.That(warehouse.Latitude.latitude, Is.EqualTo(this.latitude));
        }

        [Test]
        public void WarehouseConstructorLongitudeTest()
        {
            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, this.altitude);

            Assert.That(warehouse.Longitude.longitude, Is.EqualTo(this.longitude));
        }

        [Test]
        public void WarehouseConstructorAltitudeTest()
        {
            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, this.altitude);

            Assert.That(warehouse.Altitude.altitude, Is.EqualTo(this.altitude));
        }

        [Test]
        public void updateWarehouseDesignationTest()
        {
            var newDesignation = "Lisboa";
            var warehouse = new Warehouse(this.id, newDesignation, this.address, this.latitude, this.longitude, this.altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);

            warehouse.update(warehouseDto);

            Assert.That(warehouse.Designation.designation, Is.EqualTo(newDesignation));

        }

        [Test]
        public void updateWarehouseAddressTest()
        {
            var newAddress = "Rua do Almada,1000-004,Lisboa,Portugal,54";
            var warehouse = new Warehouse(this.id, this.designation, newAddress, this.latitude, this.longitude, this.altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);

            warehouse.update(warehouseDto);

            Assert.That(warehouse.Address.Value, Is.EqualTo(newAddress));

        }


        [Test]
        public void updateWarehouseLatitudeTest()
        {
            var newLatitude = 50;
            var warehouse = new Warehouse(this.id, this.designation, this.address, newLatitude, this.longitude, this.altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);

            warehouse.update(warehouseDto);

            Assert.That(warehouse.Latitude.latitude, Is.EqualTo(newLatitude));

        }

        [Test]
        public void updateWarehouseLongitudeTest()
        {
            var newLongitude = 60;
            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, newLongitude, this.altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);

            warehouse.update(warehouseDto);

            Assert.That(warehouse.Longitude.longitude, Is.EqualTo(newLongitude));

        }

        [Test]
        public void updateAltitudeWarehouseTest()
        {
            var newAltitude = 60;
            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, newAltitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);

            warehouse.update(warehouseDto);

            Assert.That(warehouse.Altitude.altitude, Is.EqualTo(newAltitude));

        }

    }
}