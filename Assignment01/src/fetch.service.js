const apiUrl = "http://localhost:8080"

// •	The hourly forecast for the next 24 hours
// •	All data for the latest measurement of each kind
// •	Minimum temperature for the last day
// •	Maximum temperature for the last day
// •	Total precipitation for the last day
// •	Average wind speed for the last day

async function getMeasurements() {
    const res = await fetch(`${apiUrl}/data`);
    return arrayToMeasurements(await res.json());
}

async function getPredictions() {
    const res = await fetch(`${apiUrl}/forecast`);
    return arrayToForecasts(await res.json());
}

function sendFetchData(data) {
    fetch(`${apiUrl}/data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

function arrayToMeasurements(arr) {
    const data = [];
    for (const item of arr) {
        data.push(buildMeasurementItem(item));
    }
    return data;
}

function arrayToForecasts(arr) {
    const data = [];
    for (const item of arr) {
        data.push(buildForecastItem(item));
    }
    return data;
}

function buildForecastItem(item) {
    switch (item.type) {
        case 'temperature':
            return new TemperaturePrediction(item.time, item.place, item.type, item.to, item.from, item.unit);
        case 'precipitation':
            return new PrecipitationPrediction(item.time, item.place, item.type, item.to, item.from, item.unit, item.precipitation_types);
        case 'cloud coverage':
            return new CloudCoveragePrediction(item.time, item.place, item.type, item.to, item.from, item.unit);
        case 'wind speed':
            return new WindPrediction(item.time, item.place, item.type, item.to, item.from, item.unit, item.directions);
        default:
            console.error("Unknown measurement type: " + item.type);
            return null;
    }
}

function buildMeasurementItem(item) {
    switch (item.type) {
        case 'temperature':
            return new Temperature(item.time, item.place, item.value, item.type, item.unit);
        case 'precipitation':
            return new Precipitation(item.time, item.place, item.value, item.type, item.unit, item.precipitation_type);
        case 'cloud coverage':
            return new CloudCoverage(item.time, item.place, item.value, item.type, item.unit);
        case 'wind speed':
            return new Wind(item.time, item.place, item.value, item.type, item.unit, item.direction);
        default:
            console.error("Unknown measurement type: " + item.type);
            return null;
    }
}

