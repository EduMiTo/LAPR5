using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveriesController : ControllerBase
    {
        private readonly DeliveryService _service;
        private readonly WarehouseService _wService;

        public DeliveriesController(DeliveryService service, WarehouseService warehouseService)
        {
            _service = service;
            _wService = warehouseService;
        }

        // GET: api/Deliveries
        [HttpGet("listAll")]
        public async Task<ActionResult<IEnumerable<DeliveryDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Deliveries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryDto>> GetById(DeliveryDto dto)
        {
            var cat = await _service.GetByIdAsync(new DeliveryId(dto.Id));

            if (cat == null)
            {
                return NotFound("The Delivery does not exist");
            }

            return cat;
        }


        [HttpGet("{warehouses}/warehouse")]
        public async Task<ActionResult<IEnumerable<DeliveryDto>>> GetByWarehouseId(DeliveryDto dto)
        {
            var cat = await _service.GetByWarehouseAsync(new WarehouseId(dto.warehouse));

            if (cat == null)
            {
                return NotFound("The Warehouse does not exist");
            }

            return cat;
        }

        [HttpGet("{dateTime}/BeetweenDates")]
        public async Task<ActionResult<IEnumerable<DeliveryDto>>> GetBetweenDates([FromBody]string dateTime)
        {
            

            try
            {
                
                var dates = dateTime.Split(",");

                DateTime date1;
                DateTime date2;
                if (DateTime.Parse(dates[1]) > DateTime.Parse(dates[0]))
                {
                    date1 = DateTime.Parse(dates[0]);
                    date2 = DateTime.Parse(dates[1]);
                }
                else
                {
                    date2 = DateTime.Parse(dates[0]);
                    date1 = DateTime.Parse(dates[1]);
                }
                
                
                var cat = await _service.GetBetweenDatesAsync(date1, date2);

                if (cat == null)
                {
                    return NotFound("There were no Deliveries between those dates");
                }
                return cat;
            }catch(Exception e)
            {
                return BadRequest("Error parsing the dates");
            }


            

        
        }


        // POST: api/Deliveries
        [HttpPost]
        public async Task<ActionResult<DeliveryDto>> Create(DeliveryDto dto)
        {
            try
            {

                var warehouse = await _wService.GetByIdAsync(new WarehouseId(dto.warehouse));

                if (warehouse == null)
                {
                    return NotFound("The warehouse does not exist");
                }

                

                var cat = await _service.AddAsync(dto, warehouse);

                return CreatedAtAction(nameof(GetById), new { id = cat.Id }, cat);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            
        }

        
        // PUT: api/Deliveries/5
        [HttpPatch("{id}")]
        public async Task<ActionResult<DeliveryDto>> Update(DeliveryDto dto)
        {
        

            try
            {
                var cat = await _service.UpdateAsync(dto);
                
                if (cat == null)
                {
                    return NotFound("The delivery does not exist");
                }
                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Deliveries/5
      /*  [HttpDelete("{id}")]
        public async Task<ActionResult<DeliveryDto>> SoftDelete(Guid id)
        {
            var cat = await _service.InactivateAsync(new DeliveryId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return Ok(cat);
        }*/
        
        // DELETE: api/Deliveries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DeliveryDto>> HardDelete(DeliveryDto dto)
        {
            try
            {
                var cat = await _service.DeleteAsync(new DeliveryId(dto.Id));

                if (cat == null)
                {
                    return NotFound("The Delivery does not exist");
                }

                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}