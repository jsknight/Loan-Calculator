"use strict"; // ECMAScript 5 strict mode for browser that support it

function calculate(){
     // look up the input and output elements in the document
     var amount = document.getElementById("amount");
     var apr = document.getElementById("apr");
     var years = document.getElementById("years");
     var zipcode = document.getElementById("zipcode");
     var payment = document.getElementById("payment");
     var total = document.getElementById("total");
     var totalinterest = document.getElementById("totalinterest");

     // Get the users input from the input elements, Asume its all valid
     // Convert interest from an percentage to a decimal, and convert it from 
     // an anual rate to a monthly rate. Convert Payment period in years
     // to the number of monthly payments
     var principal = parseFloat(amount.value);
     var interest = parseFloat(apr.value) / 100 / 12;
     var payments = parseFloat(years.value) * 12;

     // compute the monthly payment figure
     var x = Math.pow(1 + interest, payments);
     var monthly = (principal*x*interest)/(x-1);

     // If Finite result the input was good

     if(isFinite(monthly)){
          payment.innerHTML = monthly.toFixed(2);
          total.innerHTML = (monthly * payments).toFixed(2);
          totalinterest.innerHTML = ((monthly*payments)-principal).toFixed(2);

          // Save the Input to Local Storage if available
          save(amount.value, apr.value, years.value, zipcode.value);

          // Fetch Lenders for the users zipcode
          try{
               getLenders(amount.value, apr.value, years.value, zipcode.value);
          }catch(e){
               /* Ignore Errors */
          }

          // plot chart
          chart(principal, interest, monthly, payments);
     }else{
          // Result is not Finite wich means input was incomplete
          // Erase content
          payment.innerHTML = "";
          total.innerHTML = "";
          totalinterest.innerHTML = "";
          chart(); // chart with no args clears the chart
     }
};
