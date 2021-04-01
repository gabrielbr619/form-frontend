const page = window.document
window.addEventListener('load', getUsers)




function getUsers() {
    const url = "https://form-api-nodejs.herokuapp.com/users"

    fetch(url, {
        method: 'get'
    }).then(resp => {
        resp.json().then(data => {
            ListUsers(data)

            
        })

    })
}

function deleteUser(id){
    console.log('clicou')
    const url = "https://form-api-nodejs.herokuapp.com/users"
    const objId ={'_id': id}
    console.log(objId)
    const objIdString = JSON.stringify(objId)
    console.log(objIdString)

    fetch(url,{
        method:'delete',
        body: objIdString,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    
    }).then((resp) => {
        location.reload()
    }).catch(function (error) {
        console.error(error)
    })




}

// fetch(url + '/' + item, {
//     method: 'delete'
//   }).then(response =>
//     response.json().then(json => {
//       return json;
//     })
//   );


function ListUsers(data) {

    data.forEach(el => {
        const card = createCard()
        const lista = createLi(el)
        const nome = createNome(el)
        const email = createEmail(el)
        const retrato = createRetrato(el)
        const texto = createTexto(el)
        const remove = removeButton(el._id)

        card.append(remove)
        card.append(retrato)
        card.append(nome)
        card.append(email)
        card.append(texto)
        card.append(lista)

        document.querySelector('.layout').append(card)

    });
}

function createCard() {
    const card = document.createElement('div')
    const color = document.createElement('div')
    card.classList.add('card')
    color.classList.add('color')
    color.style.backgroundColor = randomBgColor()
    card.append(color)
    return card
}
function createNome(el) {
    const nome = document.createElement('h1')
    nome.classList.add("nome")
    nome.innerText = el.first + ' ' + el.last
    return nome
}

function createEmail(el) {
    const email = document.createElement('h2')
    email.innerText = el.email
    return email
}

function createRetrato(el) {
    const retrato = document.createElement('div')
    const img = document.createElement('img')
    
    img.classList.add('img')
    retrato.classList.add('retrato')

    img.src = el.img
    retrato.append(img)

    return retrato
}

function createTexto(el) {
    const texto = document.createElement('p')
    texto.classList.add('sobre')
    texto.innerText = el.sobre

    return texto
}

function createLi(el) {
    const comida = document.createElement('p')
    const desenho = document.createElement('p')
    const hobbies = document.createElement('p')
    const lista = document.createElement('ul')

    comida.innerHTML = `Minha comida favorita é <strong>
        <li>${el.comida}</li>
    </strong>`
    hobbies.innerHTML = `Meus hobbies são <strong>
        <li>${el.hobby}</li>
    </strong>`
    desenho.innerHTML = `Meu desenho favorito de infância é <strong>
        <li>${el.desenho}</li>
    </strong>`

    lista.append(comida)
    lista.append(hobbies)
    lista.append(desenho)

    return lista


}

function removeButton(id){
    console.log(id)
    const remove = document.createElement('div')
    remove.classList.add('remove')
    remove.textContent = "X"
    remove.addEventListener('click', function(){
        deleteUser(id)
    })

    return remove
}

function randomBgColor() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor
}