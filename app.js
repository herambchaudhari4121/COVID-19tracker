console.log("Built in 2020 by danieljcode");
console.log("https://github.com/danieljcode");

const inputMain = document.getElementById("mainSelector");

var countryCode =  "FR";

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function(position) { 
        await $.get("https://ipinfo.io", function(response) {
            countryCode = response.country;
            $('#mainSelector').val(response.country).prop('selected', true);
            getAllData();
        }, "jsonp");
     });
}

const predictionsDisplay = document.getElementById("predictions");
var predictions;

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
        var deathsDisplay = document.getElementById("deaths");
        var recoveredDisplay = document.getElementById("recovered");
        deathsDisplay.innerHTML = response.deaths.toLocaleString();
        casesDisplay.innerHTML = response.cases.toLocaleString();
        recoveredDisplay.innerHTML = response.recovered.toLocaleString();
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
      predictions = response;
      

      
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
          casesNum.innerHTML = `<span class="text-dark">Predicted Cases:</span> ` + element.cases.toLocaleString();
          dateNum.innerHTML = "Date: " + element.date;

          prediction.appendChild(casesNum);
          prediction.appendChild(dateNum);
          predictionsDisplay.appendChild(prediction);
      });

      createGraph();

    });

}

function getAllData() {
  getCurrentData();
  getFutureData();
}

inputMain.addEventListener("change", () => {
    console.log(inputMain.value);
    countryCode = inputMain.value;
    getAllData();
})

getAllData();

function createGraph()
{

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [predictions[0].date, predictions[1].date, predictions[2].date, predictions[3].date, predictions[4].date, predictions[5].date],
        datasets: [{
            label: 'Number of cases',
            data: [predictions[0].cases,predictions[1].cases,predictions[2].cases,predictions[3].cases,predictions[4].cases,predictions[5].cases],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }]
        }
    }
});
}
