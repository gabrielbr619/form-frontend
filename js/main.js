const button = document.querySelector('#submit')
const form = document.querySelector('#form1')
const formUpload = document.querySelector('#form2')
form.addEventListener('submit', formValidation)

function formValidation(e) {
    e.preventDefault()
    let first = document.querySelector('#first').value
    let last = document.querySelector('#last').value
    let email = document.querySelector('#email').value
    let comida = document.querySelector('#comida').value
    let hobby = document.querySelector('#hobby').value
    let desenho = document.querySelector('#desenho').value

    const array = [first, last, email, comida, hobby, desenho]
    var verification = true

    array.every(el =>{
        if (!isNaN(el)) {
            alert(`"${el}" Não é um dado válido`)
            verification = false
            return false
        }})


    console.log(verification)
    if (verification==false) {
        return
    }else{sendForm(e)}


    

}

function createFormImg() {
    const input = document.querySelector('input[type="file"]')
    const data = new FormData()
    data.append('image', input.files[0])
    data.append('user', 'teste')

    fetch('https://form-api-nodejs.herokuapp.com/images', {
        method: 'post',
        body: data
    })
    console.log(data)
}

function createForm() {
    let formData = new FormData(form)
    const input = document.querySelector('input[type="file"]')
    const obj = {};
    formData.forEach((value, key) => {
        if (key === "image") {
        } else {
            obj[key] = value
        }
    })
    let json = JSON.stringify(obj)
    return json
}
function sendForm(e) {
    e.preventDefault()

    const json = createForm()
    createFormImg()
    console.log(json)


    const url = 'https://form-api-nodejs.herokuapp.com/userss'


    fetch(url, {
        method: 'post',
        body: json,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((resp) => {
        }).catch(function (error) {
            console.error(error)
        })

    //form.reset()
}