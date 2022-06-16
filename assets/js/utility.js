async function loadData(file, filter, filterValue, yCategory) {
    // file = filename as string
    const response = await axios.get(file);
    let json = await csv().fromString(response.data)
    let series = []
    // category - category name as string
    for (let dataPoint of json) {
        if (dataPoint[filter] == filterValue) {
            series.push({
                'x': parseInt(dataPoint.year),
                // yvalue - dependant variable
                'y': parseInt(dataPoint[yCategory])
            })
        }
    }
    return (series)
}

async function loadUnfilteredData(file, yCategory) {
    // file = filename as string
    const response = await axios.get(file);
    let json = await csv().fromString(response.data)
    let series = []
    for (let dataPoint of json) {
        series.push({
            'x': parseInt(dataPoint.year),
            // yvalue - dependant variable
            'y': parseInt(dataPoint[yCategory])
        })
    }
    return (series)
}

async function loadJson(file){
    const response = await axios.get(file);
    let json = await csv().fromString(response.data)
    return json
}

function changeYearRange(json, container, filter, filterValue, yCategory) {
    let series = []
    let minYear=parseInt(container.querySelector('.minYear').value)
    let maxYear=parseInt(container.querySelector('.maxYear').value)
    for (let dataPoint of json) {
        if (dataPoint.year >= minYear && dataPoint.year <= maxYear) {
            if (dataPoint[filter] == filterValue) {
                series.push({
                    'x': parseInt(dataPoint.year),
                    // yvalue - dependant variable
                    'y': parseInt(dataPoint[yCategory])
                })
            }
        }
    }
    return (series)
}

async function changeUnfilteredYearRange(file, minYear, maxYear) {
    // file = filename as string
    const response = await axios.get(file);
    let json = await csv().fromString(response.data)
    // name = name of data series
    let series = []
    // category - category name as string
    for (let dataPoint of json) {
        if (dataPoint.year >= minYear && dataPoint.year <= maxYear) {
            series.push({
                'x': parseInt(dataPoint.year),
                // yvalue - dependant variable
                'y': parseInt(dataPoint[yValue])
            })
        }
    }
    return (series)
}