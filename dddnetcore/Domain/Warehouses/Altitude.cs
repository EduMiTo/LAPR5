using DDDSample1.Domain.Shared;


    public class Altitude : IValueObject
    {

        public double altitude { get; init; }

        public Altitude() { }
        public Altitude(double altitude)
        {

            if (altitude < 0)
            {
                throw new BusinessRuleValidationException("Altitude cannot be negative!");
            }

            this.altitude = altitude;
        }
}

