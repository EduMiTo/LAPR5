using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;


namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehousesController : ControllerBase
    {
        private readonly WarehouseService _service;

        public WarehousesController(WarehouseService service)
        {
            _service = service;
        }

        // GET: api/Warehouses/listAll
        [HttpGet("listAll")]
        public async Task<ActionResult<IEnumerable<WarehouseDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Warehouses
        [HttpGet("{id}")]
        public async Task<ActionResult<WarehouseDto>> GetById(WarehouseDto dto)
        {
            var warehouse = await _service.GetByIdAsync(new WarehouseId(dto.Id));

            if (warehouse == null)
            {
                return NotFound("No warehouses found with the typed id!");
            }

            return warehouse;
        }

        // GET: api/Warehouses/designation
        [HttpGet("{designation}/designation")]
        public async Task<ActionResult<WarehouseDto>> GetByDesignationId(WarehouseDto dto)
        {

           
            var warehouse = await _service.GetByDesignationAsync(new Designation(dto.Designation));

            if (warehouse == null)
            {
                return NotFound("No warehouses found with the typed designation!");
            }

            return warehouse;
        }

        // POST: api/Warehouses
        [HttpPost]
        public async Task<ActionResult<WarehouseDto>> Create(WarehouseDto dto)
        {
            try
            {
                var warehouse = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetById), new { Id = warehouse.Id }, warehouse);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        
        // PATCH: api/Warehouses
        [HttpPatch]
        public async Task<ActionResult<WarehouseDto>> Update(WarehouseDto dto)
        {
           
            try
            {
                var warehouse = await _service.UpdateAsync(dto);
                
                if (warehouse == null)
                {
                    return NotFound();
                }

                return Ok(warehouse);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // DELETE: api/Warehouses
        [HttpDelete("{id}")]
        public async Task<ActionResult<WarehouseDto>> HardDelete(WarehouseDto dto)
        {
            Console.WriteLine('i');
            try
            {
                var warehouse = await _service.DeleteAsync(new WarehouseId(dto.Id));

                if (warehouse == null)
                {
                    return NotFound("Cannot delete an inexistent warehouse!");
                }

                return Ok(warehouse);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Warehouses
        [HttpDelete("SoftDelete/{id}")]
        public async Task<ActionResult<WarehouseDto>> SoftDelete(WarehouseDto dto)
        {
            Console.WriteLine('u');
            try
            {
                var warehouse = await _service.InactivateAsync(new WarehouseId(dto.Id));

                if (warehouse == null)
                {
                    return NotFound();
                }

                return Ok(warehouse);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
            
        }
    }
}