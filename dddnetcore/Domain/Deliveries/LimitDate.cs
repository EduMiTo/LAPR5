using System;
using DDDSample1.Domain.Shared;


namespace DDDSample1.Domain.Deliveries
{
    public class LimitDate : IValueObject
    {

        public DateTime limitDate { get; init; }


        public LimitDate(){

        }

        public LimitDate(String value)
        {
            try{
                string[] date = value.Split('/');
                
                if(date.Length != 3)
                    throw new Exception("Invalid date format, should be dd/mm/yyyy");
                

                if(date[2].Length > 4){
                    throw new BusinessRuleValidationException("Invalid year format, should be 4 digits long maximum");
                }

                if(Int16.Parse(date[1]) > 12 || Int16.Parse(date[1]) < 0){
                    throw new BusinessRuleValidationException("Month out of range");
                }
                
                if(Int16.Parse(date[0]) <= 0){
                    throw new BusinessRuleValidationException("Day out of range, should not be negative");
                }
                else if((Int16.Parse(date[0]) > 31)){
                    throw new BusinessRuleValidationException("Day out of range, should not be over 31 days long");
                }
            }catch(Exception e){
                throw new BusinessRuleValidationException(e.Message);
            }

            try { 
                this.limitDate = DateTime.Parse(value);
            }
            catch(Exception e)
            {
                throw new BusinessRuleValidationException(e.Message);
            }
            

            
        }
    }

}