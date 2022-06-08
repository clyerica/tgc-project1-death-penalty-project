const executionsChart = new ApexCharts(
    document.querySelector('#execution-chart-container'), {
    'chart': {
        'type': 'bar',
        'height': '75%',
        'stacked': true,
        'animations': {
            'enabled': true,
            'easing': 'easeout',
            'speed': 600,
            animateGradually: {
                enabled: true,
                delay: 500
            },
            dynamicAnimation: {
                enabled: true,
                speed: 600
            }
        }
    },
    'series': [],
    'noData': { 'text': 'please wait, data is loading' },
    'xaxis':{
        'type':'categories',
        'tickPlacement':'on',
    },
    'yaxis':{ 'axisTicks': {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            width: 6,
            offsetX: 0,
            offsetY: 0}
        },
    'colors':['#040F0F', '#443A33', '#600200'],
}
)

executionsChart.render();

async function loadData() {
    const response = await axios.get('assets/data/judicial-executions.csv');
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