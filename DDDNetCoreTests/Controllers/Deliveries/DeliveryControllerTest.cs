using DDDSample1.Controllers;
using DDDSample1.Domain.Deliveries;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Warehouses;

namespace DDDNetCoreTests.Controllers.Deliveries
{
    internal class DeliveryControllerTest
    {

        public string Id;
        public int weight;
        public string limitDate;
        public int loadTime;
        public int unloadTime;
        public string warehouse;

        public string wid = "P01";
        public string designation = "Porto";
        public string address = "Rua Santa Catarina,4400-300,Porto,Portugal,10" ;
        public double latitude = 10;
        public double longitude = 25;
        public double altitude = 25;
        public bool principal = false;

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
        public void DefineWarehouseControllerConstrutor()
        {

            var mockBlocoRepo = new Mock<IDeliveryRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();
            var deliveryServiceMock = new Mock<DeliveryService>(mockUnitRepo.Object, mockBlocoRepo.Object);
            var mockBlocoRepo2 = new Mock<IWarehouseRepository>();

            
            var warehouseServiceMock = new Mock<WarehouseService>(mockUnitRepo.Object, mockBlocoRepo2.Object);


            var deliveryController = new DeliveriesController(deliveryServiceMock.Object, warehouseServiceMock.Object);

            Assert.NotNull(deliveryController);
        }

        [Test]
        public async Task GetAllTest()
        {

            var mockBlocoRepo = new Mock<IDeliveryRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var deliveryServiceMock = new Mock<DeliveryService>(mockUnitRepo.Object, mockBlocoRepo.Object);

            var mockBlocoRepo2 = new Mock<IWarehouseRepository>();


            var warehouseServiceMock = new Mock<WarehouseService>(mockUnitRepo.Object, mockBlocoRepo2.Object);



            deliveryServiceMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(createdDeliveries());

            var deliveryController = new DeliveriesController(deliveryServiceMock.Object, warehouseServiceMock.Object);


            var result = await deliveryController.GetAll();
            


            Assert.AreEqual(result.Value.Count(), createdDeliveries().Count);
        }


        private List<DeliveryDto> createdDeliveries()
        {
            var dels = new List<DeliveryDto>();

            dels.Add(new DeliveryDto { Id = this.Id, weight = this.weight, limitDate = this.limitDate, unloadTime = this.unloadTime, loadTime = this.loadTime, warehouse = this.warehouse });
            dels.Add(new DeliveryDto { Id ="Id2", weight = 50, limitDate = "1/2/2013", unloadTime = 10, loadTime =30, warehouse = "P01" });
            dels.Add(new DeliveryDto { Id = "Id3", weight = 100, limitDate = "15/2/2016", unloadTime = 20, loadTime = 50, warehouse = "P01" });
            return dels;
        }


        [Test]
        public async Task GetByIdTest()
        {
            string IdValue = "Id";

            var idDel = new DeliveryId(IdValue);
            
            var del1 = new Delivery(IdValue, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);
            var delDto = new DeliveryDto { Id = this.Id, weight = this.weight, limitDate = this.limitDate, unloadTime = this.unloadTime, loadTime = this.loadTime, warehouse = this.warehouse };


            var mockRepo = new Mock<IDeliveryRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();
            
            var deliveryServiceMock = new Mock<DeliveryService>(mockUnitRepo.Object, mockRepo.Object);
            var mockBlocoRepo2 = new Mock<IWarehouseRepository>();


            var warehouseServiceMock = new Mock<WarehouseService>(mockUnitRepo.Object, mockBlocoRepo2.Object);



            deliveryServiceMock.Setup(repo => repo.GetByIdAsync(idDel)).ReturnsAsync(delDto);
            
            var deliveryController = new DeliveriesController(deliveryServiceMock.Object, warehouseServiceMock.Object);


            var getDel = await deliveryController.GetById(delDto);

            Assert.AreEqual(IdValue, getDel.Value.Id);
        }

        [Test]
        public async Task CreateTest()
        {
            var del1 = new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);
            var delDto = DeliveryMapper.domainToDTO(del1);
            var warehouse = new Warehouse(this.wid, this.designation, this.address, this.latitude, this.longitude, this.altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);

            var mockRepo = new Mock<IDeliveryRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var deliveryServiceMock = new Mock<DeliveryService>(mockUnitRepo.Object, mockRepo.Object);

            deliveryServiceMock.Setup(repo => repo.AddAsync(delDto, warehouseDto)).ReturnsAsync(delDto);

            var mockBlocoRepo2 = new Mock<IWarehouseRepository>();


            var warehouseServiceMock = new Mock<WarehouseService>(mockUnitRepo.Object, mockBlocoRepo2.Object);

            warehouseServiceMock.Setup(repo => repo.GetByIdAsync(new WarehouseId(this.warehouse))).ReturnsAsync(warehouseDto);

            var deliveryController = new DeliveriesController(deliveryServiceMock.Object, warehouseServiceMock.Object);


            var del = await deliveryController.Create(delDto);

            Assert.AreEqual(delDto, (del.Result as CreatedAtActionResult).Value);

        }


        [Test]
        public async Task UpdateTest()
        {
            int newWeight = 1000;

            string IdValue = "Id";

            var delDto = new DeliveryDto { Id = this.Id, weight = newWeight, limitDate = this.limitDate, unloadTime = this.unloadTime, loadTime = this.loadTime, warehouse = this.warehouse };



            var mockRepo = new Mock<IDeliveryRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var deliveryServiceMock = new Mock<DeliveryService>(mockUnitRepo.Object, mockRepo.Object);

            deliveryServiceMock.Setup(repo => repo.UpdateAsync(delDto)).ReturnsAsync(delDto);



            var mockBlocoRepo2 = new Mock<IWarehouseRepository>();


            var warehouseServiceMock = new Mock<WarehouseService>(mockUnitRepo.Object, mockBlocoRepo2.Object);


            var deliveryController = new DeliveriesController(deliveryServiceMock.Object, warehouseServiceMock.Object);
            var getDel = await deliveryController.Update(delDto);

            
            Assert.AreEqual(delDto, (getDel.Result as OkObjectResult).Value);
        }


        [Test]
        public async Task DeleteTest()
        {
            string IdValue = "Id";

            var idDel = new DeliveryId(IdValue);

            var del1 = new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);
            var delDto = new DeliveryDto { Id = this.Id, weight = this.weight, limitDate = this.limitDate, unloadTime = this.unloadTime, loadTime = this.loadTime, warehouse = this.warehouse };
            var warehouse = new Warehouse(this.wid, this.designation, this.address, this.latitude, this.longitude, this.altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);


            var mockRepo = new Mock<IDeliveryRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var deliveryServiceMock = new Mock<DeliveryService>(mockUnitRepo.Object, mockRepo.Object);

            deliveryServiceMock.Setup(repo => repo.DeleteAsync(idDel)).ReturnsAsync(delDto);

            var mockBlocoRepo2 = new Mock<IWarehouseRepository>();


            var warehouseServiceMock = new Mock<WarehouseService>(mockUnitRepo.Object, mockBlocoRepo2.Object);


            var deliveryController = new DeliveriesController(deliveryServiceMock.Object, warehouseServiceMock.Object);

            var getDel = await deliveryController.HardDelete(delDto);

            Assert.AreEqual(delDto, (getDel.Result as OkObjectResult).Value);
        }


    }
}
