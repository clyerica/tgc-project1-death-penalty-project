function extractMailFormValues() {
    let firstName = document.querySelector('.first-name').value;
    let lastName = document.querySelector('.last-name').value;
    let email = document.querySelector('.email').value;
    let formInfo = {
        'firstName': firstName,
        'lastName': lastName,
        'email': email
    }
    return formInfo
}
let mailBtn = document.querySelector('.mail-list-btn')
mailBtn.addEventListener('click', function () {
    let errors = document.querySelectorAll('.error')
    for (let each of errors) {
        each.innerHTML = ""
    }
    let form = extractMailFormValues()
    if (!form.firstName == '' && !form.lastName == '' && form.email.includes('@', '.')) {
        let mailForm = document.querySelector('.mail-form')
        mailForm.innerHTML = "<h3 class='text-center'>Thanks for joining us!</h3>"
    }
    else {
        if (form.firstName == '') {
            document.querySelector('.first-name-error').innerHTML = 'Please enter your first name'
        }
        if (form.lastName == '') {
            document.querySelector('.last-name-error').innerHTML = 'Please enter your last name'
        } if (!form.email.includes('@', '.')) {
            document.querySelector('.email-error').innerHTML = 'Please enter a valid email address'
        }
    }
})



