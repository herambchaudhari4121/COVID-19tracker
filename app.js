console.log("Built in 2020 by danieljcode");
console.log("https://github.com/danieljcode");

const inputMain = document.getElementById("mainSelector");

var countryCode =  "FR"; //The default is france, france is cool I guess... :)

const predictionsDisplay = document.getElementById("predictions");

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};


function getCurrentData(){
    //THIS CODE WILL BE RAN ON PAGE LOAD
    var settings = {
        "url": `https://covid19-api.org/api/status/${countryCode}`,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);

        var casesDisplay = document.getElementById("cases");
        var deathsDisplay = document.getElementById("deaths")
  
        deathsDisplay.innerHTML = response.deaths;
        casesDisplay.innerHTML = response.cases;
      });

}

function getFutureData(){
    var settingsFUTURE = {
      "url": `https://covid19-api.org/api/prediction/${countryCode}`,
      "method": "GET",
      "timeout": 0,
    };

    $.ajax(settingsFUTURE).done(function (response) {

      console.log(response);

      
      var myNode = document.getElementById("predictions");
          while (myNode.firstChild) {
              myNode.removeChild(myNode.firstChild);
          }

      response.forEach(element => {
          var prediction = document.createElement("div");
          prediction.setAttribute("class", "col-12 box");
          var casesNum = document.createElement("h1");
          casesNum.setAttribute("class", "red");
          var dateNum = document.createElement("h2");
          casesNum.innerHTML = `<a style="color: black; text-decoration: underline;">Predicted cases:</a> ` + element.cases;
          dateNum.innerHTML = "Date: " + element.date;

          prediction.appendChild(casesNum);
          prediction.appendChild(dateNum);
          predictionsDisplay.appendChild(prediction);
      });

    });

}

inputMain.addEventListener("change", () => {
    console.log(inputMain.value);
    countryCode = inputMain.value;
})