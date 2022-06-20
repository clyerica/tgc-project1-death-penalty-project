let chartSections = document.querySelectorAll('.charts-section')
for (let section of chartSections) {
    let chartTabs = section.querySelectorAll('.chart-tab')
    let charts = section.querySelectorAll('.chart-container')
    for (let tab of chartTabs) {
        tab.addEventListener('click', function () {
            for (let each of chartTabs) {
                each.children[0].classList.remove('active')
            }
            tab.children[0].classList.add('active')
            let chart = tab.dataset.chart
            for (let each of charts) {
                each.classList.add('hidden')
                each.classList.remove('show')
            }
            document.querySelector('#' + chart).classList.add('show')
            document.querySelector('#' + chart).classList.remove('hidden')
        })
    }
}

function resizeLayoutChange() {
    let viewportWidth = window.innerWidth;
    for (let section of chartSections) {
        let chartTabs = section.querySelectorAll('.chart-tab')
        let charts = section.querySelectorAll('.chart-container')
        if (viewportWidth >= 768) {
            for (let each of charts) {
                each.classList.remove('hidden')
                each.classList.remove('show')
            }
        }
        else {
            let sampleChart = charts[0]
            if (!sampleChart.classList.contains('show') && !sampleChart.classList.contains('hidden')) {
                chartTabs[0].click()
            }
        }
    }
}

resizeLayoutChange()
window.onresize = resizeLayoutChange