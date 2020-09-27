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
    fetch(`https://covid19-api.org/api/status/${countryCode}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

function Reload(){
    
    fetch(`https://covid19-api.org/api/status/${countryCode}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

inputMain.addEventListener("change", () =>{

    console.log(inputMain.value);
    countryCode = inputMain.value;
})