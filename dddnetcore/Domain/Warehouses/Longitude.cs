using System;
using DDDSample1.Domain.Shared;

public class Longitude : IValueObject{


    public double longitude {get; init;}

    public Longitude(){}
    public Longitude (double longitude){

        if (longitude < -180 || longitude > 180){
            throw new BusinessRuleValidationException ("Longitude must be in the following range: [-180 degrees - 180 degrees]");
        }
        
        this.longitude = longitude;
    }
}

//longitude (-180 até 180) - x axis