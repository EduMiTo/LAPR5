using System;
using DDDSample1.Domain.Shared;

public class Designation : IValueObject{

    public string designation { get;private set;}

    public Designation(){

    }
    public Designation(string designation){
        
        if (designation.Length > 50){
            throw new BusinessRuleValidationException ("The warehouse designation must have a maximum of 50 chars!");
        }
        
        this.designation = designation;
    }
}