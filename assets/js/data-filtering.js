let chartContainer = document.querySelectorAll('.chart-container')
for (let container of chartContainer) {
    let showBtn = container.querySelector('.show-btn')
    let filters = container.querySelector('.filters')
    showBtn.addEventListener('click', function () {
        if (showBtn.innerHTML == 'Show filters') {
            filters.classList.remove('d-none')
            filters.classList.add('d-block')
            showBtn.innerHTML = 'Hide filters'
        }
        else {
            filters.classList.remove('d-block')
            filters.classList.add('d-none')
            showBtn.innerHTML = 'Show filters'
        }
    })
}

document.querySelector('#filterDemographicsBtn').addEventListener('click', async function () {
    // demographicsChart.updateSeries([])
    let container = document.querySelector('#demographics-container')
    let filterBox=container.querySelector('.filters')
    filterBox.classList.remove('filter-error')
    void container.querySelector('.filters').offsetWidth
    let options = container.querySelectorAll('input[name="demographics-filters"]')
    let filter = ''
    for (o of options) {
        if (o.checked) {
            filter = o.value
        }
    }
    if (!filter|| parseInt(container.querySelector('.minYear').value)<2003 || parseInt(container.querySelector('.maxYear').value)>2020) {
        filterBox.classList.add('filter-error')
    }
    else {
        filterBox.classList.remove('d-block')
        filterBox.classList.add('d-none')
        if (filter == 'status') {
            let demographicsStatusJson = await loadJson('assets/data/demographics-status.csv')
            let newDemographicsData = changeYearRange(demographicsStatusJson, container, filter, 'New', 'no_of_drug_abusers')
            let repeatDemographicsData = changeYearRange(demographicsStatusJson, container, filter, 'Repeat', 'no_of_drug_abusers')
            let newDemographics = newDemographicsData
            let repeatDemographics = repeatDemographicsData
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
            let drugs = ['Heroin', 'Cannabis', 'Buprenorphine', 'Ecstasy', 'Methamphetamine', 'Ketamine', 'Nimetazepam', 'Cocaine', 'Opium', 'Methadone', 'NPS']
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
