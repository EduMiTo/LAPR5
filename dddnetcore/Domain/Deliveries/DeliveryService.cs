using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;
using System;

namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDeliveryRepository _repo;

        public DeliveryService(IUnitOfWork unitOfWork, IDeliveryRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public virtual async Task<List<DeliveryDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<DeliveryDto> listDto = list.ConvertAll<DeliveryDto>(cat => DeliveryMapper.domainToDTO(cat));

            return listDto;
        }

        public virtual async Task<DeliveryDto> GetByIdAsync(DeliveryId id)
        {
            var cat = await this._repo.GetByIdAsync(id);
            
            if(cat == null)
                return null;
            
            return DeliveryMapper.domainToDTO(cat);
        }


        public virtual async Task<List<DeliveryDto>> GetByWarehouseAsync(WarehouseId warehouseId)
        {
            var list = await this._repo.GetAllAsync();
            List<DeliveryDto> listDto = new List<DeliveryDto>();

            foreach (Delivery delivery in list)
            {
                if (delivery.warehouseId.value == warehouseId.value)
                {
                    listDto.Add(DeliveryMapper.domainToDTO(delivery));
                }
            }
            if (listDto.Count == 0)
                return null;

            return listDto;
        }


        public virtual async Task<List<DeliveryDto>> GetBetweenDatesAsync(DateTime dateTime1, DateTime dateTime2)
        {
            var list = await this._repo.GetAllAsync();
            List<DeliveryDto> listDto = new List<DeliveryDto>();

            foreach (Delivery delivery in list)
            {
                if (delivery.limitDate.limitDate >= dateTime1 && delivery.limitDate.limitDate <= dateTime2)
                {
                    listDto.Add(DeliveryMapper.domainToDTO(delivery));
                }
                
            }
            if (listDto.Count == 0)
                return null;

            return listDto;
        }

        public virtual async Task<DeliveryDto> AddAsync(DeliveryDto dto, WarehouseDto warehouse)
        {

            //warehousecontrolller.getbyid(dto.warehouse);
            //return dto




            var delivery = new Delivery(dto.weight, dto.limitDate, dto.unloadTime,dto.loadTime, warehouse.Id);

            await this._repo.AddAsync(delivery);

            await this._unitOfWork.CommitAsync();

            return DeliveryMapper.domainToDTO(delivery);
        }

        public virtual async Task<DeliveryDto> UpdateAsync(DeliveryDto dto)
        {
            var delivery = await this._repo.GetByIdAsync(new DeliveryId(dto.Id)); 

            if (delivery == null)
                return null;

            delivery.update(dto);

            
            await this._unitOfWork.CommitAsync();

            return DeliveryMapper.domainToDTO(delivery);
        }

       /* public async Task<DeliveryDto> InactivateAsync(DeliveryId id)
        {
            var delivery = await this._repo.GetByIdAsync(id); 

            if (delivery == null)
                return null;   

            // change all fields
            
            await this._unitOfWork.CommitAsync();

            return new DeliveryDto { id = delivery.Id, weight = delivery.weight, limitDate= delivery.limitDate , timeLoadTruck = delivery.timeLoadTruck, timeUnloadTruck = delivery.timeUnloadTruck};
        }*/

         public virtual async Task<DeliveryDto> DeleteAsync(DeliveryId id)
        {
            var delivery = await this._repo.GetByIdAsync(id); 

            if (delivery == null)
                return null;   

            
            this._repo.Remove(delivery);
            await this._unitOfWork.CommitAsync();

            return DeliveryMapper.domainToDTO(delivery);
        }
    }
}