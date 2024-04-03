using System;
using DDDSample1.Domain.Shared;

public class Latitude : IValueObject{

    public double latitude {get; init;}

    public Latitude (){}
    public Latitude (double latitude){

        if (latitude < -90 || latitude > 90){
            throw new BusinessRuleValidationException ("Latitude must be in the following range: [-90 degrees - 90 degress]");
        }

        this.latitude = latitude;
    }
}

//latitude (-90 até 90) - y axis