Apex.colors = ['#C63E45', '#2E1E22',  '#B2C7DC', '#BB8CD0', '#CF9EAA', '#44CF6C', '#F8BB4A', '#CF8E80', '#6A994E', '#F07938']

const demographicsChart = new ApexCharts(document.querySelector('#demographics-chart'), {
    'chart': {
        'id': 'demographics',
        'type': 'bar',
        'stacked': true,
        'height': '95%',
        'offsetY': 25
    },
    'series': [],
    'dataLabels': {
        'enabled': false,
    },
    'noData': { 'text': 'please wait, data is loading' },
    'xaxis': {
        'type': 'categories'
    },
    'title': {
        'text': ['Demographic Profile of Drug Abusers', 'in Singapore'],
        'align': 'center',
        style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#263238'
        },
    }

})

const summaryChart = new ApexCharts(document.querySelector('#summary-chart'), {
    'chart': {
        'id': 'summary',
        'type': 'treemap',
        'height': '95%',
        'width': '100%',
        'offsetY': 25,
        'offsetX': 10
    },
    'series': [],
    'noData': { 'text': 'please wait, data is loading' },
    'plotOptions': {
        'treemap': {
            'shadeIntensity': 0,
            'distributed': true
        }
    },
    'tooltip': {
        'y': {
            'formatter': function (value, { series, seriesIndex, dataPointIndex, w }) {
                let total = 0
                for (each of series[0]) {
                    total += each
                }
                value = (value / total * 100).toFixed(2)
                return value + '%'

            }
        }
    },
    'dataLabels': {
        'enabled': true,
        'formatter': function (value, { series, seriesIndex, dataPointIndex, w }) {
            let total = 0
            for (each of w.config.series[seriesIndex].data) {
                total += each.y
            }
            if (w.config.series[seriesIndex].data[dataPointIndex].y != 0) {
                proportion = (w.config.series[seriesIndex].data[dataPointIndex].y / total * 100).toFixed(2)
                return [`${value}`, `(${proportion}%)`]
            }
        },
        'offsetY': -5, 
        'style': {'color': '#2E1E22'}
    },
    'title': {
        'text': ['Demographic Profile','Breakdown Over Year Range'],
        'align': 'center',
        'offsetX': -15,
        'offsetY': 5,
        style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#263238'
        },
    }
})

const drcAreaChart = new ApexCharts(
    document.querySelector('#drc-area-chart'), {
    'chart': {
        'id': 'drc-total',
        'type': 'area',
        'height': '95%',
        'stacked': true,
        'group': 'drc-charts',
        'offsetY': 25
    },
    'series': [],
    'noData': { 'text': 'please wait, data is loading' },
    'xaxis': {
        'type': 'categories'
    },
    'yaxis': {
        'labels': {
            'minWidth': 20
        }
    },
    'stroke': {
        'width': 2
    },
    'legend': {
        'fontSize': '12px'
    },
    'tooltip': {
        'inverseOrder': true,
    },
    'title': {
        'text': ['Drug Rehabilitation Center Overview'],
        'align': 'center',
        style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#263238'
        },
    }
})


const drcPopulationChart = new ApexCharts(
    document.querySelector('#drc-population'), {
    'chart': {
        'id': 'drc-population',
        'type': 'line',
        'height': '95%',
        'group': 'drc-charts',
        'offsetY': 25,
        'dropShadow': {
            'enabled': true,
            'blur': 2,
        }
    },
    'series': [],
    'noData': { 'text': 'please wait, data is loading' },
    'xaxis': {
        'type': 'categories',
        'labels': {
            'rotate': 0,
        }
    },
    'yaxis': {
        'labels': {
            'minWidth': 20
        }
    },
    'stroke': {
        'width': 2
    },
    'legend': {
        'fontSize': '12px'
    },
    'title': {
        'text': ['Demographic Profile of DRC inmates'],
        'align': 'center',
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238'
        }
    }
}
)

const drcReleasesChart = new ApexCharts(
    document.querySelector('#drc-releases'), {
    'chart': {
        'id': 'drc-releases',
        'type': 'line',
        'height': '95%',
        'group': 'drc-charts',
        'offsetY': 25,
        'dropShadow': {
            'enabled': true,
            'blur': 2,
        }
    },
    'series': [],
    'noData': { 'text': 'please wait, data is loading' },
    'xaxis': {
        'type': 'categories',
        'labels': {
            'rotate': 0,
        }
    },
    'yaxis': {
        'labels': {
            'minWidth': 20
        }
    },
    'stroke': {
        'width': 2
    },
    'legend': {
        'fontSize': '12px'
    },
    'title': {
        'text': ['DRC Releases by Gender'],
        'align': 'center',
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238'
        }
    }
}
)

demographicsChart.render();
summaryChart.render();
drcAreaChart.render();
drcPopulationChart.render();
drcReleasesChart.render();

window.addEventListener('DOMContentLoaded', async function () {
    let demographicsNewData = loadData('assets/data/demographics-status.csv', 'status', 'New', 'no_of_drug_abusers')
    let demographicsRepeatData = loadData('assets/data/demographics-status.csv', 'status', 'Repeat', 'no_of_drug_abusers')

    let inmatePopulationData = loadUnfilteredData('assets/data/drc-population.csv', 'number_of_population', true, 'number_of_population')
    let releasedInmatesData = loadUnfilteredData('assets/data/drc-releases.csv', 'number_of_releases', true, 'number_of_releases')

    let populationMaleData = loadData('assets/data/drc-population-gender.csv', 'population_by_gender', 'Male', 'number_of_population')
    let populationFemaleData = loadData('assets/data/drc-population-gender.csv', 'population_by_gender', 'Female', 'number_of_population')
    let releasedMaleData = loadData('assets/data/drc-releases-gender.csv', 'releases_by_gender', 'Male', 'number_of_releases')
    let releasedFemaleData = loadData('assets/data/drc-releases-gender.csv', 'releases_by_gender', 'Female', 'number_of_releases')

    let newDemographics = await demographicsNewData
    let repeatDemographics = await demographicsRepeatData

    let inmatePopulation = await inmatePopulationData
    let releasedInmates = await releasedInmatesData
    let malePopulation = await populationMaleData
    let femalePopulation = await populationFemaleData
    let maleReleases = await releasedMaleData
    let femaleReleases = await releasedFemaleData
    demographicsChart.updateSeries([
        {
            'name': 'New',
            'data': newDemographics
        },
        {
            'name': 'Repeat',
            'data': repeatDemographics
        }

    ])

    summaryChart.updateSeries([
        {
            'data': [
                {
                    'x': 'New',
                    'y': summariseData(newDemographics)
                },
                {
                    'x': 'Repeat',
                    'y': summariseData(repeatDemographics)
                }
            ]
        }
    ])

    drcAreaChart.updateSeries(
        [
            {
                'name': 'Population of inmates',
                'data': inmatePopulation
            },
            {
                'name': 'Number of Releases',
                'data': releasedInmates
            }
        ]
    )

    drcPopulationChart.updateSeries(
        [{
            'name': 'Male',
            'data': malePopulation
        },
        {
            'name': 'Female',
            'data': femalePopulation
        }
        ]
    )

    drcReleasesChart.updateSeries(
        [{
            'name': 'Male',
            'data': maleReleases
        },
        {
            'name': 'Female',
            'data': femaleReleases
        }
        ]
    )
})


