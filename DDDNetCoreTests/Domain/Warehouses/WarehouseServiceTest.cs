using Moq;
using DDDSample1.Domain.Shared;
using DDDSample1.Controllers;

namespace DDDSample1.Domain.Warehouses.Tests
{
   
    public class WarehouseServiceTests
    {

        public string id = "P01";
        public string designation = "Porto";
        public string address = "Rua Santa Catarina,4400-300,Porto,Portugal,10";
        public double latitude = 10;
        public double longitude = 25;
        public double altitude = 10;
        public bool principal = false;

        [Test]
        public void DefineWarehouseServiceConstrutor()
        {

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();

            var warehouseService = new WarehouseService(unitOfWorkMock.Object, warehouseRepoMock.Object);

            Assert.NotNull(warehouseService);
        }

        [Test]
        public async Task GetByIdAsyncTestAsync()
        {

            WarehouseId warehouseId = new WarehouseId("P01");

            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, this.altitude);

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();
            warehouseRepoMock.Setup(x => x.GetByIdAsync(warehouseId)).ReturnsAsync(warehouse);

            var service = new WarehouseService(unitOfWorkMock.Object, warehouseRepoMock.Object);

            var getById = await service.GetByIdAsync(warehouse.Id);

            Assert.That(warehouse.Id.Value, Is.EqualTo(getById.Id));

        }

        [Test]
        public async Task GetAllAsync()
        {

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();
            warehouseRepoMock.Setup(x => x.GetAllAsync()).ReturnsAsync(warehouseList());

            var service = new WarehouseService(unitOfWorkMock.Object, warehouseRepoMock.Object);

            var getAll = await service.GetAllAsync();

            Assert.That(getAll.Count, Is.EqualTo(warehouseList().Count));

        }

        [Test]
        public async Task AddAsync() 
        {

            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, this.altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();

            warehouseRepoMock.Setup(x => x.AddAsync(warehouse));
            unitOfWorkMock.Setup(x => x.CommitAsync());

            var service = new WarehouseService(unitOfWorkMock.Object, warehouseRepoMock.Object);

            var addAsync = await service.AddAsync(warehouseDto);

            Assert.AreEqual(addAsync.Id, warehouse.Id.Value);

        }

        [Test]
        public async Task UpdateAsync() 
        {

            var warehouseId = new WarehouseId(this.id);
            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, this.altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);


            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();

            warehouseRepoMock.Setup(x => x.GetByIdAsync(warehouseId)).ReturnsAsync(warehouse);
            unitOfWorkMock.Setup(x => x.CommitAsync());


            var service = new WarehouseService(unitOfWorkMock.Object, warehouseRepoMock.Object);


            var updateAsync = await service.UpdateAsync(warehouseDto);

            Assert.AreEqual(updateAsync.Id, warehouse.Id.Value);        
            

    }

        [Test]
        public async Task DeleteAsync()
        {
            var warehouseId = new WarehouseId(this.id);
            var warehouse = new Warehouse(this.id, this.designation, this.address, this.latitude, this.longitude, this.altitude);

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var warehouseRepoMock = new Mock<IWarehouseRepository>();

            warehouseRepoMock.Setup(x => x.GetByIdAsync(warehouseId)).ReturnsAsync(warehouse);
            warehouseRepoMock.Setup(x => x.Remove(warehouse));
            unitOfWorkMock.Setup(x => x.CommitAsync());

            var service = new WarehouseService(unitOfWorkMock.Object, warehouseRepoMock.Object);

            var deleteAsync = await service.DeleteAsync(warehouseId);

            Assert.AreEqual(deleteAsync.Id, warehouse.Id.Value);

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
    }
}