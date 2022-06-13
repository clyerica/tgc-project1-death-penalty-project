let chartContainer = document.querySelectorAll('.chart-container')
for (let container of chartContainer) {
    let showBtn=container.querySelector('.show-btn')
    let filters=container.querySelector('.filters')
    console.log(showBtn)
    showBtn.addEventListener('click', function () {
        if (showBtn.innerHTML=='Show filters'){
            filters.classList.remove('d-none')
            filters.classList.add('d-block')
            showBtn.innerHTML='Hide filters'
        }
        else{
            filters.classList.remove('d-block')
            filters.classList.add('d-none')
            showBtn.innerHTML='Show filters'
        }
    })
}