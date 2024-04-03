using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Deliveries
{
    public class Weight : IValueObject
    {

        public int weight { get; init; }


        public Weight()
        {

        }

        public Weight(int value)
        {

            if (value < 0)
            {
                throw new BusinessRuleValidationException("Mass cannot be negative");
            }

            this.weight = value;

        }
    }
}