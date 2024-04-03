using DDDSample1.Controllers;
using Moq;
using DDDSample1.Domain.Warehouses;
using DDDSample1.Domain.Shared;
using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCoreTests.Controllers.Warehouses
{

    public class WarehousesControllerTests
    {

        public string id = "P01";
        public string designation = "Porto";
        public string address = "Rua Santa Catarina,4400-300,Porto,Portugal,10";
        public double latitude = 10;
        public double longitude = 25;
        public double altitude = 10;
        public bool principal = false;

        [Test]
        public void DefineWarehouseControllerConstrutor()
        {
            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();

            var warehouseServiceMock = new Mock<WarehouseService>(unitOfWorkMock.Object, warehouseRepoMock.Object);

            var warehouseController = new WarehousesController(warehouseServiceMock.Object);

            Assert.NotNull(warehouseController);
        }


        [Test]
        public async Task GetAllTest()
        {

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();

            var warehouseServiceMock = new Mock<WarehouseService>(unitOfWorkMock.Object, warehouseRepoMock.Object);
            warehouseServiceMock.Setup(x => x.GetAllAsync()).ReturnsAsync(warehouseDtoList());

            var warehouseController = new WarehousesController(warehouseServiceMock.Object);

            var result = await warehouseController.GetAll();

            Assert.That(result.Value.Count(), Is.EqualTo(warehouseDtoList().Count));

        }

        [Test]
        public async Task GetByIdTest()
        {

            var warehouseId = new WarehouseId(id);
            var warehouse = new Warehouse(id, designation, address, latitude, longitude, altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();

            var warehouseServiceMock = new Mock<WarehouseService>(unitOfWorkMock.Object, warehouseRepoMock.Object);
            warehouseServiceMock.Setup(x => x.GetByIdAsync(warehouseId)).ReturnsAsync(warehouseDto);


            var warehouseController = new WarehousesController(warehouseServiceMock.Object);

            var result = await warehouseController.GetById(warehouseDto);


            Assert.That(result.Value.Id, Is.EqualTo(warehouseDto.Id));
        }

        [Test]
        public async Task CreateTest()
        {

            var warehouseId = new WarehouseId(id);
            var warehouse = new Warehouse(id, designation, address, latitude, longitude, altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();

            var warehouseServiceMock = new Mock<WarehouseService>(unitOfWorkMock.Object, warehouseRepoMock.Object);
            warehouseServiceMock.Setup(x => x.AddAsync(warehouseDto)).ReturnsAsync(warehouseDto);


            var warehouseController = new WarehousesController(warehouseServiceMock.Object);

            var result = await warehouseController.Create(warehouseDto);

            Assert.That((result.Result as CreatedAtActionResult).Value, Is.EqualTo(warehouseDto));

        }

        [Test]
        public async Task UpdateTest()
        {

            var warehouseId = new WarehouseId(id);
            var warehouse = new Warehouse(id, designation, address, latitude, longitude, altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);


            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();

            var warehouseServiceMock = new Mock<WarehouseService>(unitOfWorkMock.Object, warehouseRepoMock.Object);
            warehouseServiceMock.Setup(x => x.UpdateAsync(warehouseDto)).ReturnsAsync(warehouseDto);

            var warehouseController = new WarehousesController(warehouseServiceMock.Object);

            var result = await warehouseController.Update(warehouseDto);

            Assert.That((result.Result as OkObjectResult).Value, Is.EqualTo(warehouseDto));


        }

        [Test]
        public async Task DeleteTest()
        {

            var warehouseId = new WarehouseId(id);
            var warehouse = new Warehouse(id, designation, address, latitude, longitude, altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();

            var warehouseServiceMock = new Mock<WarehouseService>(unitOfWorkMock.Object, warehouseRepoMock.Object);
            warehouseServiceMock.Setup(x => x.DeleteAsync(warehouseId)).ReturnsAsync(warehouseDto);

            var warehouseController = new WarehousesController(warehouseServiceMock.Object);

            var result = await warehouseController.HardDelete(warehouseDto);

            Assert.That((result.Result as OkObjectResult).Value, Is.EqualTo(warehouseDto));


        }


        public List<WarehouseDto> warehouseDtoList()
        {

            var warehouse1 = new Warehouse(id, designation, address, latitude, longitude, altitude);
            var warehouse2 = new Warehouse("P02", "Lisboa", address, 40, 30, altitude);
            var warehouse3 = new Warehouse("P03", "Madeira", address, 75, -120, altitude);

            var warehouseDtoList = new List<WarehouseDto>();

            warehouseDtoList.Add(WarehouseMapper.domainToDTO(warehouse1));
            warehouseDtoList.Add(WarehouseMapper.domainToDTO(warehouse2));
            warehouseDtoList.Add(WarehouseMapper.domainToDTO(warehouse3));

            return warehouseDtoList;
        }


    }
}