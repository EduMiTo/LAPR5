using System;
using System.Reflection.Emit;
using DDDSample1.Domain.Shared;

public class Address{

    public string Value { get; init;} 
    public string Street {get; init;}
    public string ZipCode {get; init;}

    public string City {get;init;}

    public string Country {get; init;}

    public int DoorNumber {get; init;}

    public Address()
    {

    }

    public Address(string address){

        string[] substring = address.Split(',');

        if(substring.Length != 5){
            throw new BusinessRuleValidationException("Invalid address. You must type the street, zip code, city, country and door number, all separated by a comma!");
        }


        if (!isZipCodeValid(substring[1])){
            throw new BusinessRuleValidationException ("Invalid Zip Code! Your zip code must have 4 numbers followed by a hyphen ('-'), followed by 3 numbers!");
        }

        int val = Int16.Parse(substring[4]);

            if (val <= 0){
                throw new BusinessRuleValidationException ("The door number cannot be zero or a negative number!");
            }


        
        this.Street = substring[0];
        this.ZipCode = substring[1];
        this.City = substring[2];
        this.Country = substring[3];
        this.DoorNumber = val;
        this.Value = address;

    }
    

    public bool isZipCodeValid (string zipCode){
        
        string[] substring = zipCode.Split('-');

        if (substring[0].Length != 4 || substring[1].Length != 3)
        {
            return false;
        }
        
        return true;
    }
  
}