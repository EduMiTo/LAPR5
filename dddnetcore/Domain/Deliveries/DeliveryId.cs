using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryId : EntityId
    {
        public string value { get; init; }

        [JsonConstructor]
        public DeliveryId(Guid value) : base(value)
        {
            this.value = value.ToString();
        }

        public DeliveryId(String value) : base(value)
        {
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
        
       
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}