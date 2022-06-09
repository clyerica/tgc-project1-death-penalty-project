const executionsChart = new ApexCharts( document.querySelector('#execution-chart-container'), {
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
    'xaxis': {
        'type': 'categories',
        'tickPlacement': 'on',
    },
    'yaxis': {
        'axisTicks': {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            width: 6,
            offsetX: 0,
            offsetY: 0
        }
    },
    'colors': ['#040F0F', '#443A33', '#600200'],
})

executionsChart.render();

window.addEventListener('DOMContentLoaded', async function () {
    let murderData = loadData('assets/data/judicial-executions.csv', 'types_of_judical_executions', 'MURDER', 'number_of_judical_executions')
    let firearmData = loadData('assets/data/judicial-executions.csv', 'types_of_judical_executions', 'FIREARMS', 'number_of_judical_executions')
    let drugData = loadData('assets/data/judicial-executions.csv', 'types_of_judical_executions', 'DRUG', 'number_of_judical_executions')

    let murders = await murderData
    let firearms = await firearmData
    let drugs = await drugData

    executionsChart.updateSeries(
        [{
            'name': 'Murder',
            'data': murders
        },
        {
            'name': 'Firearms',
            'data': firearms
        },
        {
            'name': 'Drugs',
            'data': drugs

        }]
    )
})