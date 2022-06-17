let chartContainer = document.querySelectorAll('.chart-container')
for (let container of chartContainer) {
    let showBtn = container.querySelector('.show-btn')
    let filters = container.querySelector('.filters')
    showBtn.addEventListener('click', function () {
        if (showBtn.innerHTML == 'Show filters') {
            showElement(filters)
            showBtn.innerHTML = 'Hide filters'
        }
        else {
            hideElement(filters)
            showBtn.innerHTML = 'Show filters'
        }
    })
}

document.querySelector('#filterDemographicsBtn').addEventListener('click', async function () {
    // demographicsChart.updateSeries([])
    let container = document.querySelector('#demographics-container')
    let minYear = parseInt(container.querySelector('.minYear').value)
    let maxYear = (container.querySelector('.maxYear').value)
    let filter = getFilterValue(container, 'demographics-filters')
    let filterBox = container.querySelector('.filters')
    filterBox.classList.remove('filter-error')
    void container.querySelector('.filters').offsetWidth
    if (minYear < 2003 || minYear > 2020 || maxYear < 2003 || maxYear > 2020 || minYear > maxYear) {
        filterBox.classList.add('filter-error')
    }
    else {
        hideElement(filterBox)
        let showBtn = container.querySelector('.show-btn')
        showBtn.innerHTML = 'Show filters'
        if (filter == 'status') {
            let demographicsStatusJson = await loadJson('assets/data/demographics-status.csv')
            let newDemographics = changeYearRange(demographicsStatusJson, container, filter, 'New', 'no_of_drug_abusers')
            let repeatDemographics = changeYearRange(demographicsStatusJson, container, filter, 'Repeat', 'no_of_drug_abusers')
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
        }
        if (filter == 'drug_of_abuse') {
            let demographicsDrugsJson = await loadJson('assets/data/demographics-drug.csv')
            demographicsDrugsJson = demographicsDrugsJson.filter(function (e) { return e.status == "Total" })
            let drugs = ['Heroin', 'Cannabis', 'Buprenorphine', 'Ecstasy', 'Methamphetamine', 'Ketamine', 'Nimetazepam', 'Cocaine', 'Opium', 'NPS']
            let drugDemographics = []
            for (let d of drugs) {
                let data = changeYearRange(demographicsDrugsJson, container, filter, d, 'no_of_drug_abusers')
                drugDemographics.push({ 'name': d, 'data': data })
            }
            demographicsChart.updateSeries(drugDemographics)
        }
        if (filter == 'gender') {
            let demographicsGenderJson = await loadJson('assets/data/demographics-gender.csv')
            demographicsGenderJson = demographicsGenderJson.filter(function (e) { return e.status == "Total" })
            let maleDemographicsData = changeYearRange(demographicsGenderJson, container, filter, 'Male', 'no_of_drug_abusers')
            let femaleDemographicsData = changeYearRange(demographicsGenderJson, container, filter, 'Female', 'no_of_drug_abusers')
            maleDemographics = maleDemographicsData
            femaleDemographics = femaleDemographicsData
            demographicsChart.updateSeries(
                [
                    {
                        'name': 'Male',
                        'data': maleDemographics
                    },
                    {
                        'name': 'Female',
                        'data': femaleDemographics
                    }

                ]
            )
        }
        if (filter == 'ethnic_group') {
            let demographicsEthnicityJson = await loadJson('assets/data/demographics-ethnicity.csv')
            demographicsEthnicityJson = demographicsEthnicityJson.filter(function (e) { return e.status == "Total" })
            let ethnicities = ['Chinese', 'Malay', 'Indian', 'Others']
            let ethnicityDemographics = []
            for (let e of ethnicities) {
                let data = changeYearRange(demographicsEthnicityJson, container, filter, e, 'no_of_drug_abusers')
                ethnicityDemographics.push({ 'name': e, 'data': data })
            }
            demographicsChart.updateSeries(ethnicityDemographics)
        }
        if (filter == 'age_group') {
            let demographicsAgeJson = await loadJson('assets/data/demographics-age.csv')
            demographicsAgeJson = demographicsAgeJson.filter(function (e) { return e.status == "Total" })
            let ages = ['Below 20', '20-29', '30-39', '40-49', '50-59', '60 & Above']
            let ageDemographics = []
            for (let a of ages) {
                let data = changeYearRange(demographicsAgeJson, container, filter, a, 'no_of_drug_abusers')
                ageDemographics.push({ 'name': a, 'data': data })
            }
            demographicsChart.updateSeries(ageDemographics)
        }
    }
})


document.querySelector('#filterPopulationBtn').addEventListener('click', async function () {
    let container = document.querySelector('#drc-population-container')
    let filterBox = container.querySelector('.filters')
    filterBox.classList.remove('filter-error')
    void container.querySelector('.filters').offsetWidth
    let minYear = parseInt(container.querySelector('.minYear').value)
    let maxYear = (container.querySelector('.maxYear').value)
    let filter = getFilterValue(container, 'population-filters')
    if (minYear < 2007 || minYear > 2021 || maxYear < 2007 || maxYear > 2021 || minYear > maxYear) {
        filterBox.classList.add('filter-error')
    }
    else {
        let showBtn = container.querySelector('.show-btn')
        showBtn.innerHTML = 'Show filters'
        hideElement(filterBox)
        if (filter == "population_by_gender") {
            let populationGenderJson = await loadJson('assets/data/drc-population-gender.csv')
            let malePopulation = changeYearRange(populationGenderJson, container, filter, 'Male', 'number_of_population')
            let femalePopulation = changeYearRange(populationGenderJson, container, filter, 'Female', 'number_of_population')
            drcPopulationChart.updateSeries([
                {
                    'name': 'Male',
                    'data': malePopulation
                },
                {
                    'name': 'Female',
                    'data': femalePopulation
                }
            ])
        }
        if (filter == "population_by_education_level") {
            let populationEducationJson = await loadJson('assets/data/drc-population-education.csv')
            let education = ["No Education", "Primary", "Secondary", "Pre University", "Vocational", "Tertiary & Above"]
            let educationPopulation = []
            for (let e of education) {
                let data = changeYearRange(populationEducationJson, container, filter, e, 'number_of_population')
                educationPopulation.push({ 'name': e, 'data': data })
            }
            drcPopulationChart.updateSeries(educationPopulation)
        }
        if (filter == "population_by_age_group") {
            let populationAgeJson=await loadJson('assets/data/drc-population-age.csv')
            let ages=['Below 21', '21-30', '31-40', '41-50','51-60','60 Above']
            let agePopulation=[]
            for (let a of ages){
                let data=changeYearRange(populationAgeJson, container, filter, a, 'number_of_population')
                agePopulation.push({'name':a, 'data':data})
            }
            drcPopulationChart.updateSeries(agePopulation)
        }
    }
})