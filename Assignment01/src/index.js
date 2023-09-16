let requestType = false;
let selectedCity = "Horsens";

function displayPredictions(city, predictions){
    document.getElementById("forecastTableBody").innerHTML = "";
    let row = "";
    let count = 0;
    predictions.forEach(prediction => {
        if(prediction.getPlace() === city){
            if(count === 0){
                row += "<td class='row'>" + prediction.getTime() + "</td>";
            }
            switch(prediction.getType()){
                case "temperature":
                    row += "<td class='row'>" + prediction.getMin() + " - " + prediction.getMax() + " " + prediction.getUnit() + "</td>";
                    break;
                case "wind speed":
                    row += "<td class='row'>" + prediction.getMin() + " - " + prediction.getMax() + " " + prediction.getUnit() + "</td>";
                    break;
                case "precipitation":
                    row += "<td class='row'>" + prediction.getMin() + " - " + prediction.getMax() + " " + prediction.getUnit() + "</td>";
                    break;
                case "cloud coverage":
                    row += "<td class='row'>" + prediction.getMin() + " - " + prediction.getMax() + "</td>";
                    break;
            }
            count++;
            if(count === 4){
                count = 0;
                let tr = document.createElement("tr");
                tr.innerHTML = row;
                document.getElementById("forecastTableBody").appendChild(tr);
                row = "";
            }
        }
    });
}

function changeFetch(){
    if(requestType){
        requestType = false;
    }
    else{
        requestType = true;
    }
    requestPredictions(selectedCity);
    requestMeasurements(selectedCity);
}

function displayMeasurements(city, measurements){
    let minTemp = 0;
    let maxTemp = 0;
    let averageWindSpeed = 0;
    let amountOfWindSpeedMeasurements = 0;
    let precipitation = 0;
    let amountOfHours = 0;
    let windSpeedUnit = "";
    let precipitationUnit = "";
    measurements.reverse();
    measurements.every(measurement => {
        amountOfHours++;
        //12 measurements per hour for last 24 hours
        if(amountOfHours === 300){
            return false;
        }
        if(measurement.getPlace() === city){
            switch(measurement.getType()){
                case "temperature":
                    if(measurement.getValue() > maxTemp){
                        maxTemp = measurement.getValue() + " " + measurement.getUnit();
                    }
                    if(measurement.getValue() < minTemp){
                        minTemp = measurement.getValue() + " " + measurement.getUnit();
                    }
                    break;
                case "wind speed":
                    averageWindSpeed += measurement.getValue();
                    windSpeedUnit = measurement.getUnit();
                    amountOfWindSpeedMeasurements++;
                    break;
                case "precipitation":
                    precipitation += measurement.getValue();
                    precipitationUnit = measurement.getUnit();
                    break;
            }
        }
        return true;
    });
    document.getElementById("min_temp").value = minTemp;
    document.getElementById("max_temp").value = maxTemp;
    document.getElementById("precipitation").value = precipitation.toFixed(2) + " " +  precipitationUnit;
    document.getElementById("wind_speed").value = (averageWindSpeed/amountOfWindSpeedMeasurements).toFixed(2) + " " + windSpeedUnit;
}

function switchCity(city){
    selectedCity = city;
    requestPredictions(city);
    requestMeasurements(city);
    removeAllActive();
    document.getElementById(city).classList.add("active");
}

function removeAllActive(){
    document.getElementById("Horsens").classList.remove("active");
    document.getElementById("Aarhus").classList.remove("active");
    document.getElementById("Copenhagen").classList.remove("active");
}

async function requestPredictions(city){
    let predictions;
    if(!requestType){
        predictions = await getPredictions();
    }
    else{
        predictions = await getPredictionsXHR();
    }
    displayPredictions(city, predictions);
}

async function requestMeasurements(city){
    let measurements;
    if(!requestType){
        measurements = await getMeasurements();
    }
    else{
        measurements = await getMeasurementsXHR();
    }
    displayMeasurements(city, measurements);
}

(async () => {
    requestPredictions(selectedCity);
    requestMeasurements(selectedCity);
})()
