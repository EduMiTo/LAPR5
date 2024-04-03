using DDDSample1.Controllers;
using DDDSample1.Domain.Warehouses;
using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moq;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCoreTests.Integration.Warehouses.ControllerServiceTest
{
    internal class ControllerServiceTest
    {

        public string id = "P01";
        public string designation = "Porto";
        public string address = "Rua Santa Catarina,4400-300,Porto,Portugal,10";
        public double latitude = 10;
        public double longitude = 25;
        public double altitude = 10;
        public bool principal = false;




        [Test]
        public async Task GetAllTest()
        {

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();
            warehouseRepoMock.Setup(x => x.GetAllAsync()).ReturnsAsync(warehouseList());

            var service = new WarehouseService(unitOfWorkMock.Object, warehouseRepoMock.Object);

            var warehouseController = new WarehousesController(service);


            var getAll = await warehouseController.GetAll();

            Assert.AreEqual(getAll.Value.Count(), warehouseList().Count);
        }

        public List<Warehouse> warehouseList()
        {

            var warehouse1 = new Warehouse(id, designation, address, latitude, longitude, altitude);
            var warehouse2 = new Warehouse("P02", "Lisboa", address, 40, 30, altitude);
            var warehouse3 = new Warehouse("P03", "Madeira", address, 75, -120, altitude);

            List<Warehouse> warehouseList = new List<Warehouse>();

            warehouseList.Add(warehouse1);
            warehouseList.Add(warehouse2);
            warehouseList.Add(warehouse3);

            return warehouseList;

        }


        [Test]
        public async Task AddTest() //rever o que comparar
        {

            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, this.altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse) ;

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();

            warehouseRepoMock.Setup(x => x.AddAsync(warehouse));
            unitOfWorkMock.Setup(x => x.CommitAsync());

            var service = new WarehouseService(unitOfWorkMock.Object, warehouseRepoMock.Object);

            var warehouseController = new WarehousesController(service);


            var addAsync = await warehouseController.Create(warehouseDto);



            Assert.AreEqual(warehouseDto.ToString(), (addAsync.Result as CreatedAtActionResult).Value.ToString());

        }

        [Test]
        public async Task GetByIdTest()
        {

            WarehouseId warehouseId = new WarehouseId("P01");

            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, this.altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);


            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();
            warehouseRepoMock.Setup(x => x.GetByIdAsync(warehouseId)).ReturnsAsync(warehouse);

            var service = new WarehouseService(unitOfWorkMock.Object, warehouseRepoMock.Object);

            var warehouseController = new WarehousesController(service);


            var getById = await warehouseController.GetById(warehouseDto);
            

            Assert.That(warehouseId.value, Is.EqualTo(getById.Value.Id));

        }

        [Test]
        public async Task UpdateTest() //rever este teste
        {

            var warehouseId = new WarehouseId(this.id);
            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, this.altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);


            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();

            warehouseRepoMock.Setup(x => x.GetByIdAsync(warehouseId)).ReturnsAsync(warehouse);
            unitOfWorkMock.Setup(x => x.CommitAsync());


            var service = new WarehouseService(unitOfWorkMock.Object, warehouseRepoMock.Object);

            var warehouseController = new WarehousesController(service);

            var updateAsync = await warehouseController.Update(warehouseDto);



            Assert.AreEqual(warehouseDto.ToString(), (updateAsync.Result as OkObjectResult).Value.ToString());


        }

        [Test]
        public async Task DeleteTest()
        {
            var warehouseId = new WarehouseId(this.id);
            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, this.altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);


            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();

            warehouseRepoMock.Setup(x => x.GetByIdAsync(warehouseId)).ReturnsAsync(warehouse);
            warehouseRepoMock.Setup(x => x.Remove(warehouse));
            unitOfWorkMock.Setup(x => x.CommitAsync());

            var service = new WarehouseService(unitOfWorkMock.Object, warehouseRepoMock.Object);

            var warehouseController = new WarehousesController(service);
            
            var deleteAsync = await warehouseController.HardDelete(warehouseDto);

            Assert.AreEqual(warehouseDto.ToString(), (deleteAsync.Result as OkObjectResult).Value.ToString());

        }

    }
}
