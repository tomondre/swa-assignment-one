
/*
The models from assignment does not match the data returned from the api.
We may have to create custom models and remove the ones below
 */
function Event(time, place) {
    function getTime() {
        return time;
    }
    function getPlace() {
        return place;
    }

    return {getTime, getPlace}
}

function WeatherData(time, place, value, type, unit) {
    let event = Event(time, place);
    function getValue(){
        return value;
    }
    function getType() {
        return type;
    }

    function getUnit() {
        return unit;
    }
    return {
        ...event,
        getValue,
        getType,
        getUnit
    };
}

function Temperature(time, place, value, type, unit) {
    let data = WeatherData(time, place, value, type, unit);

    // TODO
    function convertToC() {

    }

    function convertToF() {

    }

    return {
        ...data,
        convertToC,
        convertToF
    };
}

function Precipitation(time, place, value, type, unit, precipitationType) {
    let weatherData = WeatherData(time, place, value, type, unit)
    function getPrecipitationType() {
        return precipitationType;
    }

    // TODO
    function convertToInches() {
        return ;
    }

    function convertToMM() {
        return ;
    }

    return {
        ...weatherData,
        getPrecipitationType,
        convertToInches,
        convertToMM
    };
}

function CloudCoverage(time, place, value, type, unit) {
    return {
        ...WeatherData(time, place, value, type, unit)
    }
}

function WeatherPrediction(time, place, max, min, type, unit) {
    let event = Event(time, place);
    function matches(_time, _place, _max, _min, _type, _unit) {
        return time === _time && place === _place && max === _max && min === _min && type === _type && unit === _unit
    }

    function getMin() {
        return min;
    }

    function getMax() {
        return max;
    }

    function getType() {
        return type;
    }

    function getUnit() {
        return unit;
    }

    return {
        ...event,
        getMax,
        getMin,
        getType,
        getUnit
    };
}

function TemperaturePrediction(time, place, max, min, type, unit) {
    let prediction = WeatherPrediction(time, place, max, min, type, unit)
    // TODO
    function convertToF() {

    }

    function convertToC() {

    }

    return {
        ...prediction,
        convertToF,
        convertToC
    }
}

function PrecipitationPrediction() {

}

