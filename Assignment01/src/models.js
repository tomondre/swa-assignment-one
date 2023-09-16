
/*
The models from assignment does not match the data returned from the api.
We may have to create custom models and remove the ones below
 */
function Event(time, place, type) {
    function getTime() {
        return time;
    }
    function getPlace() {
        return place;
    }

    function getType() {
        return type;
    }

    function toString() {
        return `time: ${time}, place: ${place}, type: ${type}`
    }

    return {
        getTime,
        getPlace,
        getType,
        toString
    }
}

function WeatherData(time, place, value, type, unit) {
    let item = Event(time, place, type);

    function getUnit() {
        return unit;
    }

    function getValue() {
        return value;
    }

    function toString() {
        return `${item.toString()}, unit: ${unit}`
    }

    return {
        ...item,
        getUnit,
        getValue,
        toString
    };
}

function Temperature(time, place, value, type, unit) {
    let item = WeatherData(time, place, value, type, unit);

    function convertToC() {
        if (unit === "F") {
            return (value - 32) * (5/9);
        }
        return value;
    }

    function convertToF() {
        if (unit === "C") {
            return (value * 9/5) + 32;
        }
        return value;
    }

    function toString() {
        return `${item.toString()}, unit: ${unit}`
    }

    return {
        ...item,
        convertToC,
        convertToF,
        toString
    };
}

function Precipitation(time, place, value, type, unit, precipitationType) {
    let item = WeatherData(time, place, value, type, unit)
    function getPrecipitationType() {
        return precipitationType;
    }

    function convertToInches() {
        if (unit === "mm") {
            return value / 25.4;
        }
        return value;
    }

    function convertToMM() {
        if (unit === "inches") {
            return value * 25.4;
        }
        return value;
    }

    function toString() {
        return `${item.toString()}, precipitationType: ${precipitationType}`
    }

    return {
        ...item,
        getPrecipitationType,
        convertToInches,
        convertToMM
    };
}

function Wind(time, place, value, type, unit, direction) {
    let item = WeatherData(time, place, value, type, unit)

    function getDirection() {
        return direction;
    }

    function toString() {
        return `${item.toString()}, direction: ${direction}`
    }

    return {
        ...item,
        getDirection,
        toString
    };
}

function CloudCoverage(time, place, value, type, unit) {
    return {
        ...WeatherData(time, place, value, type, unit)
    }
}

function WeatherPrediction(time, place, type, max, min, unit) {
    let item = Event(time, place, type);
    function matches(_time, _place, _max, _min, _type, _unit) {
        return time === _time && place === _place && max === _max && min === _min && type === _type && unit === _unit
    }

    function getMin() {
        return min;
    }

    function getMax() {
        return max;
    }

    function getUnit() {
        return unit;
    }

    function toString() {
        return `${item.toString()}, max: ${max}, min: ${min}, unit: ${unit}`
    }

    return {
        ...item,
        getMax,
        getMin,
        getUnit
    };
}

function TemperaturePrediction(time, place, type, max, min, unit) {
    let item = WeatherPrediction(time, place, type, max, min, unit)

    function convertToF() {
        if (unit === "C") {
            return (value * 9/5) + 32;
        }
        return value;
    }

    function convertToC() {
        if (unit === "F") {
            return (value - 32) * (5/9);
        }
        return value;
    }

    return {
        ...item,
        // convertToF,
        // convertToC
    }
}

function PrecipitationPrediction(time, place, type, max, min, unit, expectedType) {
    let item = WeatherPrediction(time, place, type, max, min, unit);

    function matches(_time, _place, _max, _min, _type) {
        return time === _time && place === _place && max === _max && min === _min && type === _type;
    }

    function getExpectedTypes() {
        return expectedType;
    }

    // function convertToMPH() {
    //     if (unit === "m/s") {
    //         return value * 2.237;
    //     }
    //     return value;
    // }
    //
    // function convertToMS() {
    //     if (unit === "mph") {
    //         return value / 2.237;
    //     }
    //     return value;
    // }

    function toString() {
        return `${item.toString()}, expectedType: ${expectedType}`
    }

    return {
        ...item,
        getExpectedTypes,
        matches,
        // convertToMPH,
        // convertToMS,
        toString
    };
}

function WindPrediction(time, place, type, max, min, unit, expectedDirections) {
    let item = WeatherPrediction(time, place, type, max, min, unit)
    function getExpectedDirections() {
        return expectedDirections;
    }

    function toString() {
        return `${item.toString()}, expectedType: ${expectedDirections}`
    }

    return {
        ...item,
        getExpectedDirections
    };
}

function CloudCoveragePrediction(time, place, type, max, min) {
    let weather = WeatherPrediction(time, place, type, max, min);

    return {
        ...weather
    };
}
