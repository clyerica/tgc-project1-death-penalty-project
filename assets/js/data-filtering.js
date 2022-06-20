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

let demographicsFilterBtns = document.querySelectorAll('.filterDemographicsBtn')
for (let each of demographicsFilterBtns) {
    each.addEventListener('click', async function () {
        // demographicsChart.updateSeries([])
        let container = document.querySelector(`#${each.dataset.container}`)
        let minYear = parseInt(container.querySelector('.minYear').value)
        let maxYear = (container.querySelector('.maxYear').value)
        let filter = getFilterValue(container, 'demographics-filters')
        let filterBox = container.querySelector('.filters')
        filterBox.classList.remove('filter-error')
        void container.querySelector('.filters').offsetWidth
        let feedbackDiv=container.querySelector('.feedback')
            feedbackDiv.classList.remove('alert')
            feedbackDiv.classList.remove('alert-danger')
            feedbackDiv.classList.remove('mt-3')
            feedbackDiv.innerHTML=""
        if (!filter || minYear < 2003 || minYear > 2020 || maxYear < 2003 || maxYear > 2020 || minYear > maxYear) {
            filterBox.classList.add('filter-error')
            feedbackDiv.classList.add('alert')
            feedbackDiv.classList.add('alert-danger')
            feedbackDiv.classList.add('mt-3')
            let feedbackList=feedbackDiv.appendChild(document.createElement('ul'))
            feedbackList.classList.add('mb-0')
            if (minYear < 2003 || minYear > 2020 || maxYear < 2003 || maxYear > 2020){
                addFeedback("Year range must be between 2003-2020.", feedbackList)
            }
            if (minYear > maxYear){
                addFeedback("Year range must be from minimum to maximum.", feedbackList)
            }
            if(!filter){
                addFeedback("Please select a filter for the data,", feedbackList)
            }
            
        }
        else {
            hideElement(filterBox)
            let showBtn = container.querySelector('.show-btn')
            showBtn.innerHTML = 'Show filters'
            syncYearRange('drug-abuse-charts-container', container)
            if (filter == 'status') {
                let demographicsStatusJson = await loadJson('assets/data/demographics-status.csv')
                let status = ['New', 'Repeat']
                let statusDemographics = getDataSeries(demographicsStatusJson, status, container, filter, 'no_of_drug_abusers')
                demographicsChart.updateSeries(statusDemographics)
                summaryChart.updateSeries([{ 'data': getSummaryData(statusDemographics) }])
            }
            if (filter == 'drug_of_abuse') {
                let demographicsDrugsJson = await loadJson('assets/data/demographics-drug.csv')
                demographicsDrugsJson = demographicsDrugsJson.filter(function (e) { return e.status == "Total" })
                let drugs = ['Heroin', 'Cannabis', 'Buprenorphine', 'Ecstasy', 'Methamphetamine', 'Ketamine', 'Nimetazepam', 'Cocaine', 'Opium', 'NPS']
                let drugDemographics = getDataSeries(demographicsDrugsJson, drugs, container, filter, 'no_of_drug_abusers')
                demographicsChart.updateSeries(drugDemographics)
                summaryChart.updateSeries([{ 'data': getSummaryData(drugDemographics) }])
            }
            if (filter == 'gender') {
                let demographicsGenderJson = await loadJson('assets/data/demographics-gender.csv')
                demographicsGenderJson = demographicsGenderJson.filter(function (e) { return e.status == "Total" })
                let gender = ['Male', 'Female']
                let genderDemographics = getDataSeries(demographicsGenderJson, gender, container, filter, 'no_of_drug_abusers')
                demographicsChart.updateSeries(genderDemographics)
                summaryChart.updateSeries([{ 'data': getSummaryData(genderDemographics) }])
            }
            if (filter == 'ethnic_group') {
                let demographicsEthnicityJson = await loadJson('assets/data/demographics-ethnicity.csv')
                demographicsEthnicityJson = demographicsEthnicityJson.filter(function (e) { return e.status == "Total" })
                let ethnicities = ['Chinese', 'Malay', 'Indian', 'Others']
                let ethnicityDemographics = getDataSeries(demographicsEthnicityJson, ethnicities, container, filter, 'no_of_drug_abusers')
                demographicsChart.updateSeries(ethnicityDemographics)
                summaryChart.updateSeries([{ 'data': getSummaryData(ethnicityDemographics) }])
            }
            if (filter == 'age_group') {
                let demographicsAgeJson = await loadJson('assets/data/demographics-age.csv')
                demographicsAgeJson = demographicsAgeJson.filter(function (e) { return e.status == "Total" })
                let ages = ['Below 20', '20-29', '30-39', '40-49', '50-59', '60 & Above']
                let ageDemographics = getDataSeries(demographicsAgeJson, ages, container, filter, 'no_of_drug_abusers')
                demographicsChart.updateSeries(ageDemographics)
                summaryChart.updateSeries([{ 'data': getSummaryData(ageDemographics) }])
            }
        }
    })
}

let drcChartBtns = document.querySelectorAll('.filterDrcBtn')
for (let each of drcChartBtns) {
    each.addEventListener('click', async function () {
        let container = document.querySelector(`#${each.dataset.container}`)
        let filterBox = container.querySelector('.filters')
        filterBox.classList.remove('filter-error')
        void container.querySelector('.filters').offsetWidth
        if (parseInt(container.querySelector('.minYear').value) < 2007 || parseInt(container.querySelector('.maxYear').value) > 2021) {
            filterBox.classList.add('filter-error')
        }
        else {
            hideElement(filterBox)
            let showBtn = container.querySelector('.show-btn')
            showBtn.innerHTML = 'Show filters'
            syncYearRange('drc-charts-container', container)
            //load jsons 
            let inmatePopulationJson = loadJson('assets/data/drc-population.csv')
            let inmatesReleasedJson = loadJson('assets/data/drc-releases.csv')
            let releasesGenderJson = loadJson('assets/data/drc-releases-gender.csv')
            //update population chart
            let populationContainer = document.querySelector('#drc-population-container')
            let filter = getFilterValue(populationContainer, 'population-filters')
            if (filter == "population_by_gender") {
                let populationGenderJson = await loadJson('assets/data/drc-population-gender.csv')
                let gender = ['Male', 'Female']
                let genderDemographics = getDataSeries(populationGenderJson, gender, container, filter, 'number_of_population')
                drcPopulationChart.updateSeries(genderDemographics)
            }
            if (filter == "population_by_education_level") {
                let populationEducationJson = await loadJson('assets/data/drc-population-education.csv')
                let education = ["No Education", "Primary", "Secondary", "Pre University", "Vocational", "Tertiary & Above"]
                let educationPopulation = getDataSeries(populationEducationJson, education, container, filter, 'number_of_population')
                drcPopulationChart.updateSeries(educationPopulation)
            }
            if (filter == "population_by_age_group") {
                let populationAgeJson = await loadJson('assets/data/drc-population-age.csv')
                let ages = ['Below 21', '21-30', '31-40', '41-50', '51-60', '60 Above']
                let agePopulation = getDataSeries(populationAgeJson, ages, container, filter, 'number_of_population')
                drcPopulationChart.updateSeries(agePopulation)
            }
            let populationInmates = await inmatePopulationJson
            let inmatesReleased = await inmatesReleasedJson
            let releasesGender = await releasesGenderJson
            let inmatePopulation = changeUnfilteredYearRange(populationInmates, container, "number_of_population")
            let releasedInmates = changeUnfilteredYearRange(inmatesReleased, container, "number_of_releases")
            let genderReleases = getDataSeries(releasesGender, ['Male', 'Female'], container, 'releases_by_gender', 'number_of_releases')
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
            drcReleasesChart.updateSeries(genderReleases)
        }
    })
} 
