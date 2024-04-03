using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;
using System;
using System.Net;

namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseService
    {
        private IUnitOfWork _unitOfWork;
        private IWarehouseRepository _repo;
        public WarehouseService(IUnitOfWork unitOfWork, IWarehouseRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public virtual async Task<List<WarehouseDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();


            List<WarehouseDto> listDto = list.ConvertAll<WarehouseDto>(warehouse =>
                new WarehouseDto { Id = warehouse.Id.Value, Designation = warehouse.Designation.designation, Address = warehouse.Address.Value, Latitude = warehouse.Latitude.latitude, Longitude = warehouse.Longitude.longitude, Altitude = warehouse.Altitude.altitude, Principal = warehouse.Principal, Active = warehouse.Active });

            return listDto;
        }

        public virtual async Task<WarehouseDto> GetByIdAsync(WarehouseId warehouseId)
        {
            var warehouse = await this._repo.GetByIdAsync(warehouseId);

            if (warehouse == null)
                return null;

            return WarehouseMapper.domainToDTO(warehouse); 

        }

        public virtual async Task<WarehouseDto> GetByDesignationAsync(Designation designation)
        {
            var list = await this._repo.GetAllAsync();


            List<WarehouseDto> listDto = list.ConvertAll<WarehouseDto>(warehouse =>
                new WarehouseDto { Id = warehouse.Id.Value, Designation = warehouse.Designation.designation, Address = warehouse.Address.Value, Latitude = warehouse.Latitude.latitude, Longitude = warehouse.Longitude.longitude, Altitude = warehouse.Altitude.altitude, Principal = warehouse.Principal, Active = warehouse.Active });


            foreach (var item in listDto)
            {
                if (item.Designation == designation.designation)
                {
                    return item;
                }
            }

            return null;
        }


        public virtual async Task<WarehouseDto> AddAsync(WarehouseDto dto)
        {

            var warehouse = new Warehouse(dto.Id, dto.Designation, dto.Address, dto.Latitude, dto.Longitude, dto.Altitude);

            await this._repo.AddAsync(warehouse);

            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.domainToDTO(warehouse);
        }

        public virtual async Task<WarehouseDto> UpdateAsync(WarehouseDto dto)
        {
            var warehouse = await this._repo.GetByIdAsync(new WarehouseId(dto.Id));

            if (warehouse == null)
                return null;

            
            warehouse.update(dto);

            await this._unitOfWork.CommitAsync();


            return WarehouseMapper.domainToDTO(warehouse);
        }

        public virtual async Task<WarehouseDto> DeleteAsync(WarehouseId warehouseId)
        {
            var warehouse = await this._repo.GetByIdAsync(warehouseId);

            if (warehouse == null)
                return null;

            this._repo.Remove(warehouse);
            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.domainToDTO(warehouse);

        }

        public async Task<WarehouseDto> InactivateAsync(WarehouseId warehouseId)
        {
            var warehouse = await this._repo.GetByIdAsync(warehouseId);

            if (warehouse == null)
                return null;

            // change all fields
            warehouse.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.domainToDTO(warehouse);
        }
    }
}
