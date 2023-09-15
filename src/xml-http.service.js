function getMeasurementsXHR() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", `${apiUrl}/data`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    resolve(arrayToMeasurements(data));
                } else {
                    reject(xhr.statusText);
                }
            }
        };

        xhr.send();
    });
}

function getPredictionsXHR() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", `${apiUrl}/forecast`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    resolve(arrayToForecasts(data));
                } else {
                    reject(xhr.statusText);
                }
            }
        };

        xhr.send();
    });
}

function sendFetchDataXHR(data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `${apiUrl}/data`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Request completed successfully
            console.log("Data sent successfully.");
        }
    };

    xhr.send(JSON.stringify(data));
}
