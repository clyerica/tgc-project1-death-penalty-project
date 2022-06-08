const executionsChart = new ApexCharts(
    document.querySelector('#execution-chart-container'), {
    'chart': {
        'type': 'bar',
        'height': '80%',
        'stacked': true,
        'animations': {
            'enabled': true,
            'easing': 'easeout',
            'speed': 700,
            animateGradually: {
                enabled: true,
                delay: 50
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        }
    },
    'series': [],
    'noData': { 'text': 'please wait, data is loading' },
    'xaxis':{
        'type':'categories',
        'tickPlacement':'on'
    },
    'colors':['#040F0F', '#341D1D', '#600200'],
    }
)

executionsChart.render();

async function loadData() {
    const response = await axios.get('data/judicial-executions.csv');
    let json = await csv().fromString(response.data)
    //  for loop method
    let series = {
        'murder': [],
        'firearms': [],
        'drugs': []
    }

    for (let dataPoint of json) {
        if (dataPoint.types_of_judical_executions == 'MURDER') {
            series.murder.push({
                'x': parseInt(dataPoint.year),
                'y': parseInt(dataPoint.number_of_judical_executions)
            })
        }
        else if (dataPoint.types_of_judical_executions == 'FIREARMS') {
            series.firearms.push({
                'x': parseInt(dataPoint.year),
                'y': parseInt(dataPoint.number_of_judical_executions)
            })
        }
        else if (dataPoint.types_of_judical_executions == 'DRUG') {
            series.drugs.push({
                'x': parseInt(dataPoint.year),
                'y': parseInt(dataPoint.number_of_judical_executions)
            })
        }
    }
    return (series)
}

window.addEventListener('DOMContentLoaded', async function () {
    let data = await loadData()
    console.log(data)
    executionsChart.updateSeries(
        [{
                'name': 'Murder',
                'data': data.murder
            },
            {
                'name': 'Firearms',
                'data': data.firearms
            },
            {
                'name': 'Drugs',
                'data': data.drugs

            }]  
    )
    })