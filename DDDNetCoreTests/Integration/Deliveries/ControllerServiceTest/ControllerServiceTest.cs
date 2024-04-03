using DDDSample1.Controllers;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moq;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Warehouses;

namespace DDDNetCoreTests.Integration.Deliveries.ControllerServiceTest
{
    internal class ControllerServiceTest
    {

        public string Id;
        public int weight;
        public string limitDate;
        public int loadTime;
        public int unloadTime;
        public string warehouse;

        public string wid = "P01";
        public string designation = "Porto";
        public string address = "Rua Santa Catarina,4400-300,Porto,Portugal,10";
        public double latitude = 10;
        public double longitude = 25;
        public double altitude = 10;
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
        public async Task GetAllTest()
        {

            

            var mockBlocoRepo = new Mock<IDeliveryRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();
            mockBlocoRepo.Setup(repo => repo.GetAllAsync()).ReturnsAsync(createdDeliveries());

            var service = new DeliveryService(mockUnitRepo.Object, mockBlocoRepo.Object);

            var mockBlocoRepo2 = new Mock<IWarehouseRepository>();


            var warehouseService = new WarehouseService(mockUnitRepo.Object, mockBlocoRepo2.Object);

            
            var deliveryController = new DeliveriesController(service, warehouseService);

            var result = await deliveryController.GetAll();



            Assert.AreEqual(result.Value.Count(), createdDeliveries().Count);
        }

        private List<Delivery> createdDeliveries()
        {
            var dels = new List<Delivery>();
            dels.Add(new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse));
            dels.Add(new Delivery("Id2", 50, "1/2/2013", 10, 30, "P01"));
            dels.Add(new Delivery("Id3", 100, "15/2/2016", 20, 50, "P01"));
            return dels;
        }

        [Test]
        public async Task AddTest()
        {
            var del1 = new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);
            var delDto = DeliveryMapper.domainToDTO(del1);


            var mockRepo = new Mock<IDeliveryRepository>();
            mockRepo.Setup(repo => repo.AddAsync(del1));
            var mockUnitRepo = new Mock<IUnitOfWork>();
            mockUnitRepo.Setup(repo => repo.CommitAsync());

            var service = new DeliveryService(mockUnitRepo.Object, mockRepo.Object);


            var mockBlocoRepo2 = new Mock<IWarehouseRepository>();
            mockBlocoRepo2.Setup(repo => repo.GetByIdAsync(new WarehouseId(this.warehouse))).ReturnsAsync(new Warehouse(this.wid, this.designation, this.address, this.latitude, this.longitude, this.altitude));

            var warehouseService = new WarehouseService(mockUnitRepo.Object, mockBlocoRepo2.Object);


            var deliveryController = new DeliveriesController(service, warehouseService);


            var del = await deliveryController.Create(delDto);

            Assert.AreEqual(delDto.ToString(), (del.Result as CreatedAtActionResult).Value.ToString());

        }


        [Test]
        public async Task GetByIdTest()
        {
            string IdValue = "Id";

            var idDel = new DeliveryId(IdValue);
            var del = new Delivery(IdValue, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);
            var delDto = DeliveryMapper.domainToDTO(del);

            var mockRepo = new Mock<IDeliveryRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(idDel)).ReturnsAsync(del);
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new DeliveryService(mockUnitRepo.Object, mockRepo.Object);

            var mockBlocoRepo2 = new Mock<IWarehouseRepository>();


            var warehouseService = new WarehouseService(mockUnitRepo.Object, mockBlocoRepo2.Object);


            var deliveryController = new DeliveriesController(service, warehouseService);

            var getDel = await deliveryController.GetById(delDto);

            Assert.AreEqual(IdValue, getDel.Value.Id);
        }


        [Test]
        public async Task UpdateTest()
        {
            int newWeight = 1000;

            string IdValue = "Id";

            var idDel = new DeliveryId(IdValue);

            var delDto = new DeliveryDto { Id = this.Id, weight = newWeight, limitDate = this.limitDate, unloadTime = this.unloadTime, loadTime = this.loadTime, warehouse = this.warehouse }; ;

            var del1 = new Delivery(IdValue, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);


            var mockRepo = new Mock<IDeliveryRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(idDel)).ReturnsAsync(del1);

            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new DeliveryService(mockUnitRepo.Object, mockRepo.Object);

            var mockBlocoRepo2 = new Mock<IWarehouseRepository>();


            var warehouseService = new WarehouseService(mockUnitRepo.Object, mockBlocoRepo2.Object);


            var deliveryController = new DeliveriesController(service, warehouseService);

            var getDel = await deliveryController.Update(delDto);

            Assert.AreEqual(delDto.ToString(), (getDel.Result as OkObjectResult).Value.ToString());
        }


        [Test]
        public async Task DeleteTest()
        {
            string IdValue = "Id";

            var idDel = new DeliveryId(IdValue);

            var del1 = new Delivery(IdValue, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);

            var delDto = DeliveryMapper.domainToDTO(del1);


            var mockRepo = new Mock<IDeliveryRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(idDel)).ReturnsAsync(del1);
            mockRepo.Setup(repo => repo.Remove(del1));

            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new DeliveryService(mockUnitRepo.Object, mockRepo.Object);

            var mockBlocoRepo2 = new Mock<IWarehouseRepository>();


            var warehouseService = new WarehouseService(mockUnitRepo.Object, mockBlocoRepo2.Object);


            var deliveryController = new DeliveriesController(service, warehouseService);


            var getDel = await deliveryController.HardDelete(delDto);



            Assert.AreEqual(delDto.ToString(), (getDel.Result as OkObjectResult).Value.ToString());
        }
    }
}
