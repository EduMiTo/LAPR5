using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;
using Moq;

namespace DDDNetCoreTest.Domain.Deliveries
{
    public class Tests
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
        public void DefineDriverServiceConstrutor()
        {

            var mockBlocoRepo = new Mock<IDeliveryRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new DeliveryService(mockUnitRepo.Object, mockBlocoRepo.Object);

            Assert.NotNull(service);
        }
        [Test]
        public async Task AddAsyncTest()
        {
            var del1 = new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);
            var warehouse = new Warehouse(this.wid, this.designation, this.address, this.latitude, this.longitude, this.altitude);
            var warehouseDto = WarehouseMapper.domainToDTO(warehouse);


            var mockRepo = new Mock<IDeliveryRepository>();
            mockRepo.Setup(repo => repo.AddAsync(del1));
            var mockUnitRepo = new Mock<IUnitOfWork>();
            mockUnitRepo.Setup(repo => repo.CommitAsync());

            var service = new DeliveryService(mockUnitRepo.Object, mockRepo.Object);


            var dto = new DeliveryDto{ Id = this.Id, weight = this.weight, limitDate = this.limitDate, unloadTime = this.unloadTime, loadTime = this.loadTime, warehouse = this.warehouse };
            var del = await service.AddAsync(dto, warehouseDto);

            Assert.AreEqual(del.weight, del1.weight.weight);

        }
        
        [Test]
        public async Task GetByIdAsyncTest()
        {
            string IdValue = "Id";

            var idDel = new DeliveryId(IdValue);
            var del = new Delivery(IdValue, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);

            var mockRepo = new Mock<IDeliveryRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(idDel)).ReturnsAsync(del);
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new DeliveryService(mockUnitRepo.Object, mockRepo.Object);

            var getDel = await service.GetByIdAsync(idDel);

            Assert.AreEqual(IdValue, getDel.Id);
        }

        
        [Test]
        public async Task getDeliveriesTest()
        {
            var mockRepo = new Mock<IDeliveryRepository>();
            mockRepo.Setup(repo => repo.GetAllAsync()).ReturnsAsync(createdDeliveries());
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new DeliveryService(mockUnitRepo.Object, mockRepo.Object);

            var getDels = await service.GetAllAsync();

            var dels = createdDeliveries();

            Assert.AreEqual(getDels.Count(), dels.Count());

        }

        private List<Delivery> createdDeliveries()
        {
            var dels = new List<Delivery>();
            dels.Add(new Delivery(this.Id, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse));
            dels.Add(new Delivery("Id2", 50, "1/2/2013", 10, 30, "P01"));
            dels.Add(new Delivery("Id3", 100, "15/2/2016", 20,50, "P01"));
            return dels;
        }


        [Test]
        public async Task UpdateAsyncTest()
        {
            int newWeight = 1000;
            
            string IdValue = "Id";

            var idDel = new DeliveryId(IdValue);

           
            
            var del = new Delivery(IdValue, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);
            var delDto = new DeliveryDto{ Id = this.Id, weight = newWeight, limitDate = this.limitDate, unloadTime = this.unloadTime, loadTime = this.loadTime, warehouse = this.warehouse };
            
            var mockRepo = new Mock<IDeliveryRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(idDel)).ReturnsAsync(del);
            
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new DeliveryService(mockUnitRepo.Object, mockRepo.Object);

            var getDel = await service.UpdateAsync(delDto);

            Assert.AreEqual(delDto.weight, getDel.weight);
        }



        [Test]
        public async Task DeleteAsyncTest()
        {
            string IdValue = "Id";

            var idDel = new DeliveryId(IdValue);

            var del = new Delivery(IdValue, this.weight, this.limitDate, this.unloadTime, this.loadTime, this.warehouse);

            var mockRepo = new Mock<IDeliveryRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(idDel)).ReturnsAsync(del);
            mockRepo.Setup(repo => repo.Remove(del));
            
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new DeliveryService(mockUnitRepo.Object, mockRepo.Object);

            var getDel = await service.DeleteAsync(idDel);

            Assert.AreEqual(IdValue, getDel.Id);
        }



    }
}