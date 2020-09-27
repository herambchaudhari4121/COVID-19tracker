console.log("Built in 2020 by danieljcode");
console.log("https://github.com/danieljcode");

const inputMain = document.getElementById("mainSelector");

var countryCode = "GB";

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};


function Start(){
    //THIS CODE WILL BE RAN ON PAGE LOAD
    var settings = {
        "url": `https://covid19-api.org/api/status/${countryCode}`,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response.cases);
      });

}

function Reload(){
    
    var settings = {
        "url": `https://covid19-api.org/api/status/${countryCode}`,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response.cases);
      });
}

inputMain.addEventListener("change", () =>{

    console.log(inputMain.value);
    countryCode = inputMain.value;
})