(async () => {
    const measurements = await getMeasurements()
    const predictions = await getPredictions();
    console.log(measurements.toString());
    console.log(predictions.toString());
})()
