using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Deliveries
{
	public class TimeTruck : IValueObject
	{

		public int timeTruck { get; init; }


		public TimeTruck()
		{

		}

		public TimeTruck(int value)
		{

			if (value < 0)
			{
				throw new BusinessRuleValidationException("Time cannot be negative");
			}

			this.timeTruck = value;

		}
	}
}