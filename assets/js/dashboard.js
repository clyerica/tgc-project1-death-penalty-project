const drcAreaChart=new ApexCharts(
    document.querySelector('#drc-area-chart'), {
        'chart':{
            'type':'area',
            'height':'100%',
            'stacked':true,
            'group':'drc-charts'
        },
        'series': [],
        'noData': { 'text': 'please wait, data is loading' },
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
        series["inmatePopulation"].push({
            'x':dataPoint.year,
            'y':dataPoint.number_of_population
        })
    }
    for (let dataPoint of json2){
        series["releasedInmates"].push({
            'x':dataPoint.year,
            'y':dataPoint.number_of_releases
        })
    }

    return series
};

const drcPopulationChart= new ApexCharts(
    document.querySelector('#drc-population'),{
        'chart':{
            'type':'line',
            'height':'100%',
            'group':'drc-charts'
        },
        'series': [],
        'noData': { 'text': 'please wait, data is loading' },
    }
)

const drcReleasedChart= new ApexCharts(
    document.querySelector('#drc-released'),{
        'chart':{
            'type':'line',
            'height':'100%',
            'group':'drc-charts'
        },
        'series': [],
        'noData': { 'text': 'please wait, data is loading' },
    }
)

drcAreaChart.render();
drcPopulationChart.render();
drcReleasedChart.render();

window.addEventListener('DOMContentLoaded', async function () {
    let data = await loadAreaChartData()
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
    })
