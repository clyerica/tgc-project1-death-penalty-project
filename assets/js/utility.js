async function loadData(file, filter, filterValue, yValue) {
    // csv = filename as string
    const response = await axios.get(file);
    let json = await csv().fromString(response.data)
    // name = name of data series
    let series = []
    // category - category name as string
    for (let dataPoint of json) {
        if (dataPoint[filter] == filterValue) {
            series.push({
                'x': parseInt(dataPoint.year),
                // yvalue - dependant variable
                'y': parseInt(dataPoint[yValue])
            })
        }
    }
    return (series)
}