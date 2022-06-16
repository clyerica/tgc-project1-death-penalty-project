const demographicsChart = new ApexCharts(document.querySelector('#demographics-chart'), {
    'chart': {
        'id': 'demographics',
        'type': 'bar',
        'stacked': true,
        'height': '95%',
        'offsetY': 25
    },
    'series': [],
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
        'type': 'categories'
    },
    'yaxis': {
        'labels': {
            'minWidth': 20
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
    }
}
)

demographicsChart.render();
seizuresChart.render();
drcAreaChart.render();
drcPopulationChart.render();
drcReleasesChart.render();

window.addEventListener('DOMContentLoaded', async function () {
    let demographicsTotalData = loadData('assets/data/demographics-status.csv', 'status', 'Total', 'no_of_drug_abusers')

    let inmatePopulationData = loadUnfilteredData('assets/data/drc-population.csv', 'number_of_population', true, 'number_of_population')
    let releasedInmatesData = loadUnfilteredData('assets/data/drc-releases.csv', 'number_of_releases', true, 'number_of_releases')

    let populationMaleData = loadData('assets/data/drc-population-gender.csv', 'population_by_gender', 'Male', 'number_of_population')
    let populationFemaleData = loadData('assets/data/drc-population-gender.csv', 'population_by_gender', 'Female', 'number_of_population')
    let releasedMaleData = loadData('assets/data/drc-releases-gender.csv', 'releases_by_gender', 'Male', 'number_of_releases')
    let releasedFemaleData = loadData('assets/data/drc-releases-gender.csv', 'releases_by_gender', 'Female', 'number_of_releases')

    let totalDemographics = await demographicsTotalData

    let inmatePopulation = await inmatePopulationData
    let releasedInmates = await releasedInmatesData
    let malePopulation = await populationMaleData
    let femalePopulation = await populationFemaleData
    let maleReleases = await releasedMaleData
    let femaleReleases = await releasedFemaleData
    demographicsChart.updateSeries(
        [
            {
                'name':'Total',
                'data': totalDemographics
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


