using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json.Linq;

namespace DDDNetCoreTests.Domain.Deliveries
{
    internal class DeliveryTest
    {

        public string Id;
        public int weight;
        public string limitDate;
        public int loadTime;
        public int unloadTime;
        public string warehouse;

        [SetUp]
        public void Setup()
        {
            Id = "Id";
            weight = 10;
            limitDate = "12/12/2012";
            loadTime = 50;
            unloadTime = 70;
            warehouse = "P01";
        }

        [Test]
        public void DefineDeliveryTest()
        {
            var del1 = new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);

            Assert.NotNull(del1);
            
        }
        

        [Test]
        public void DeliveryConstrutorIdTest()
        {
            var del = new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);

            Assert.AreEqual(del.Id.value, this.Id);
        }

        [Test]
        public void DeliveryConstrutorWeightTest()
        {
            var del = new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);

            Assert.AreEqual(del.weight.weight, this.weight);
        }

        [Test]
        public void DeliveryConstrutorLimitDateTest()
        {
            var del = new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);

            Assert.AreEqual(del.limitDate.limitDate, DateTime.Parse(this.limitDate));
        }

        [Test]
        public void DeliveryConstrutorUnloadTimeTest()
        {
            var del = new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);

            Assert.AreEqual(del.timeUnloadTruck.timeTruck, this.unloadTime);
        }

        [Test]
        public void DeliveryConstrutorLoadTimeTest()
        {
            var del = new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);

            Assert.AreEqual(del.timeLoadTruck.timeTruck, this.loadTime);
        }

        [Test]
        public void updateWeightTest()
        {
            var newWieght = 1;
            var del = new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);
            var cdelDto = new DeliveryDto { Id = this.Id, weight = newWieght, limitDate = this.limitDate, unloadTime = this.unloadTime, loadTime = this.loadTime, warehouse = this.warehouse };
            del.update(cdelDto);

            Assert.AreEqual(del.weight.weight, newWieght);
        }

        [Test]
        public void updateLimitDateTest()
        {
            var newlimitdate = "1/5/2019";
            var del = new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);
            var cdelDto = new DeliveryDto { Id = this.Id, weight = this.weight, limitDate = newlimitdate, unloadTime = this.unloadTime, loadTime = this.loadTime, warehouse = this.warehouse };
            del.update(cdelDto);

            Assert.AreEqual(del.limitDate.limitDate, DateTime.Parse(newlimitdate));
        }

        [Test]
        public void updateUnloadTest()
        {
            var newunloadTime = 1;
            var del = new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);
            var cdelDto = new DeliveryDto { Id = this.Id, weight = this.weight, limitDate = this.limitDate, unloadTime = newunloadTime, loadTime = this.loadTime, warehouse = this.warehouse };
            del.update(cdelDto);

            Assert.AreEqual(del.timeUnloadTruck.timeTruck, newunloadTime);
        }

        [Test]
        public void updateLoadTest()
        {
            var newloadTime = 1;
            var del = new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);
            var cdelDto = new DeliveryDto { Id = this.Id, weight = this.weight, limitDate = this.limitDate, unloadTime = this.unloadTime, loadTime = newloadTime, warehouse = this.warehouse };
            del.update(cdelDto);

            Assert.AreEqual(del.timeLoadTruck.timeTruck, newloadTime);
        }

    }
}
