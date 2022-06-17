Apex.colors = ['#1C110A', '#9B2915', '#E9B44C', '#50A2A7', '#88498F', '#A9E5BB', '#F08CAE', '#3777FF', '#6A994E', '#5D737E']

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
    }
})

const seizuresChart = new ApexCharts(document.querySelector('#seizures-chart'), {
    'chart': {
        'id': 'seizures',
        'type': 'bar',
        'height': '95%',
        'offsetY': 25
    },
    'series': [],
    'noData': { 'text': 'please wait, data is loading' },
    'xaxis': {
        'type': 'categories'
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
    'stroke':{
        'width':1.5
    },
    'legend': {
        'fontSize': '12px'
    }
}
)


const drcPopulationChart = new ApexCharts(
    document.querySelector('#drc-population'), {
    'chart': {
        'id': 'drc-population',
        'type': 'line',
        'height': '95%',
        'group': 'drc-charts',
        'offsetY': 25
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
    'stroke':{
        'width':1.5
    },
    'legend': {
        'fontSize': '12px'
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
        'offsetY': 25
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
    'stroke':{
        'width':1.5
    },
    'legend': {
        'fontSize': '12px'
    }
}
)

demographicsChart.render();
seizuresChart.render();
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
    let repeatDemographics=await demographicsRepeatData

    let inmatePopulation = await inmatePopulationData
    let releasedInmates = await releasedInmatesData
    let malePopulation = await populationMaleData
    let femalePopulation = await populationFemaleData
    let maleReleases = await releasedMaleData
    let femaleReleases = await releasedFemaleData
    demographicsChart.updateSeries(
        [
            {
                'name': 'New',
                'data': newDemographics
            },
            {
                'name': 'Repeat',
                'data': repeatDemographics
            }

        ]
    )

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


