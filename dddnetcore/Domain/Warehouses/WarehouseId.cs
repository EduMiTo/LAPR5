using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using System.IO.Compression;

namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseId : EntityId
    {

        public string value { get; init; }
        [JsonConstructor]
        public WarehouseId(Guid value) : base(value)
        {
            this.value = value.ToString();
        }

        public WarehouseId(String value) : base(value)
        {
            string regex = "^[A-Z][0-9]{2}$";
            Regex re = new Regex(regex);

            if (!re.IsMatch(value))
                throw new BusinessRuleValidationException("The id of the warehouse must be an alphanumeric code with 3 chars, starting with a capital letter, followed by 2 numbers");

            this.value = value;

        }



        override
        protected  Object createFromString(String text){
            return text;
        }
        
        override
        public String AsString(){
            return value.ToString();
        }

        /*public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }*/
    }
}