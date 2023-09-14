let requestType = false;
let selectedCity = "Horsens";

function switchCity(city){
    selectedCity = city;
    removeAllActive();
    document.getElementById(city).classList.add("active");
}

function removeAllActive(){
    document.getElementById("Horsens").classList.remove("active");
    document.getElementById("Aarhus").classList.remove("active");
    document.getElementById("Copenhagen").classList.remove("active");
}

function sendData(){
    let date = new Date().toISOString();
    let temperature = document.getElementById("temp").value;
    let precipitation = document.getElementById("precipitation").value;
    let windSpeed = document.getElementById("wind_speed").value;
    let cloudCoverage = document.getElementById("cloud_coverage").value;
    let data = [{"type": "temperature",
        "time": date.toString(),
        "place": selectedCity.toString(),
        "value": Number.parseFloat(temperature),
        "unit": "C"},
        {"type": "precipitation",
        "time": date.toString(),
        "place": selectedCity.toString(),
        "value": Number.parseFloat(precipitation),
        "unit": "mm",
        "precipitation_type": "rain"},
        {"type": "wind speed",
        "time": date.toString(),
        "place": selectedCity.toString(),
        "value": Number.parseFloat(windSpeed),
        "unit": "m/s",
        "direction": "North"},
        {"type": "cloud coverage",
        "time": date.toString(),
        "place": selectedCity.toString(),
        "value": Number.parseFloat(cloudCoverage),
        "unit": "%"}];
    if(!requestType){
        sendFetchData(data);
    }
    else{
        console.log("Sending xml data ", data);
    }
}

function changeFetch(){
    if(requestType){
        requestType = false;
    }
    else{
        requestType = true;
    }
}