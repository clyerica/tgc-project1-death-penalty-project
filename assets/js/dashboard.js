const demographicsChart=new ApexCharts(document.querySelector('#demographics-chart'), {
    'chart':{
        'id': 'demographics',
        'type': 'line',
        'height':'100%',
        'group': 'drugs-charts'
    },
    'series':[],
    'noData': { 'text': 'please wait, data is loading' },
        'xaxis':{
            'type':'categories'
        },
        'yaxis':{
            'labels':{
                'minWidth':20
            }
        }

})

const seizuresChart=new ApexCharts(document.querySelector('#seizures-chart'), {
    'chart':{
        'id': 'seizures',
        'type': 'bar',
        'height':'100%',
        'group': 'seizures-charts'
    },
    'series':[],
    'noData': { 'text': 'please wait, data is loading' },
        'xaxis':{
            'type':'categories'
        },
        'yaxis':{
            'labels':{
                'minWidth':20
            }
        }
})

const drcAreaChart=new ApexCharts(
    document.querySelector('#drc-area-chart'), {
        'chart':{
            'id':'drc-total',
            'type':'area',
            'height':'100%',
            'stacked':true,
            'group':'drc-charts',
        },
        'series': [],
        'noData': { 'text': 'please wait, data is loading' },
        'xaxis':{
            'type':'categories'
        },
        'yaxis':{
            'labels':{
                'minWidth':20
            }
        }
    }
)

async function loadAreaChartData(){
    const response1= axios.get('assets/data/drc-population.csv')
    const response2= axios.get('assets/data/drc-released.csv')
    let json1=await response1
    let json2=await response2
    json1= await csv().fromString(json1.data)
    json2= await csv().fromString(json2.data)

    let series= {
        'inmatePopulation': [],
        'releasedInmates': [],
    }

    for (let dataPoint of json1){
        series.inmatePopulation.push({
            'x':dataPoint.year,
            'y':dataPoint.number_of_population
        })
    }
    for (let dataPoint of json2){
        series.releasedInmates.push({
            'x':dataPoint.year,
            'y':dataPoint.number_of_releases
        })
    }

    return series
};

const drcPopulationChart= new ApexCharts(
    document.querySelector('#drc-population'),{
        'chart':{
            'id':'drc-population',
            'type':'line',
            'height':'100%',
            'group':'drc-charts'
        },
        'series': [],
        'noData': { 'text': 'please wait, data is loading' },
        'xaxis':{
            'type':'categories'
        },
        'yaxis':{
            'labels':{
                'minWidth':20
            }
        }
    }
)

const drcReleasesChart= new ApexCharts(
    document.querySelector('#drc-releases'),{
        'chart':{
            'id':'drc-releases',
            'type':'line',
            'height':'100%',
            'group':'drc-charts'
        },
        'series': [],
        'noData': { 'text': 'please wait, data is loading' },
        'xaxis':{
            'type':'categories'
        },
        'yaxis':{
            'labels':{
                'minWidth':20
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
    let data = await loadAreaChartData()
    let demographicsTotalData=loadData('assets/data/demographics-status.csv','status','Total','no_of_drug_abusers' )
    let demographicsNewData=loadData('assets/data/demographics-status.csv','status','New','no_of_drug_abusers' )
    let demographicsRepeatData=loadData('assets/data/demographics-status.csv','status','Repeat','no_of_drug_abusers' )
    
    let populationMaleData=loadData('assets/data/drc-population-gender.csv','population_by_gender', 'Male','number_of_population')
    let populationFemaleData=loadData('assets/data/drc-population-gender.csv','population_by_gender', 'Female','number_of_population')
    let releasedMaleData=loadData('assets/data/drc-releases-gender.csv', 'releases_by_gender', 'Male', 'number_of_releases')
    let releasedFemaleData=loadData('assets/data/drc-releases-gender.csv', 'releases_by_gender', 'Female', 'number_of_releases')

    let totalDemographics= await demographicsTotalData
    let newDemographics=await demographicsNewData
    let repeatDemographics=await demographicsRepeatData
    let malePopulation=await populationMaleData
    let femalePopulation= await populationFemaleData
    let maleReleases= await releasedMaleData
    let femaleReleases=await releasedFemaleData

    demographicsChart.updateSeries(
        [{
            'name': 'Drug Abusers',
            'data': totalDemographics
        },
        {
            'name': 'New',
            'data': newDemographics
        },
        {
            'name':'Repeat',
            'data': repeatDemographics
        }
    ]
    )

    drcAreaChart.updateSeries(
        [{
                'name': 'Population of inmates',
                'data': data.inmatePopulation
            },
            {
                'name': 'Number of Releases',
                'data': data.releasedInmates
            } ]
    )
    
    drcPopulationChart.updateSeries(
        [{
            'name':'Male',
            'data': malePopulation
        },
        {
            'name':'Female',
            'data':femalePopulation
        }
    ]
    )

    drcReleasesChart.updateSeries(
        [{
            'name':'Male',
            'data': maleReleases
        },
        {
            'name':'Female',
            'data':femaleReleases
        }
    ]
    )
    })
   

