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

const drcReleasedChart= new ApexCharts(
    document.querySelector('#drc-released'),{
        'chart':{
            'id':'drc-released',
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

async function loadPopulationChartData(){
    const response=await axios.get('assets/data/drc-population-gender.csv')
    const json=await csv().fromString(response.data)
    let series={
        'male':[],
        'female':[],
    }
    for (let dataPoint of json){
        if (dataPoint.population_by_gender=='Male'){
            series.male.push({
                'x': dataPoint.year,
                'y':dataPoint.number_of_population
            })
        }
        else {
            series.female.push({
                'x': dataPoint.year,
                'y':dataPoint.number_of_population
            })
        }
    }
    return series
}

async function loadReleasedChartData(){
    const response=await axios.get('assets/data/drc-released-gender.csv')
    const json=await csv().fromString(response.data)
    let series={
        'male':[],
        'female':[],
    }
    for (let dataPoint of json){
        if (dataPoint.releases_by_gender=='Male'){
            series.male.push({
                'x': dataPoint.year,
                'y':dataPoint.number_of_releases
            })
        }
        else {
            series.female.push({
                'x': dataPoint.year,
                'y':dataPoint.number_of_releases
            })
        }
    }
    return series
}

drcAreaChart.render();
drcPopulationChart.render();
drcReleasedChart.render();

window.addEventListener('DOMContentLoaded', async function () {
    let data = await loadAreaChartData()
    let populationData=await loadPopulationChartData()
    let releasedData=await loadReleasedChartData()

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
            'data': populationData.male
        },
        {
            'name':'Female',
            'data':populationData.female
        }
    ]
    )

    drcReleasedChart.updateSeries(
        [{
            'name':'Male',
            'data': releasedData.male
        },
        {
            'name':'Female',
            'data':releasedData.female
        }
    ]
    )
    })
   

