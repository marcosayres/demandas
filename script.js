const modal           = document.querySelector('.modal-container')
const tbody           = document.querySelector('tbody')
const sData           = new Date();
const sProponente     = document.querySelector('#m-proponente')
const sDemanda        = document.querySelector('#m-demanda')
const sDesenvolvedor  = document.querySelector('#m-desenvolvedor')
const sAprovado       = ''
const sImplementado   = ''
const btnSalvar       = document.querySelector('#btnSalvar')

const sDate = `${sData.getDate().toString().padStart(2, '0')}/${(sData.getMonth() + 1).toString().padStart(2, '0')}/${sData.getFullYear()} ${sData.getHours().toString().padStart(2, '0')}:${sData.getMinutes().toString().padStart(2, '0')}`;

// getDate(), getMonth(), getFullYear(), getHours() e getMinutes() 

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sProponente.value = itens[index].proponente
    sDemanda.value = itens[index].demanda
    sDesenvolvedor.value = itens[index].desenvolvedor
    sAprovado.valueOf = itens[index].aprovado
    sImplementado.valueOf = itens[index].implementado
    id = index
  } else {
    removerLabelEInput()
    sProponente.value = ''
    sDemanda.value = ''
    sDesenvolvedor.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function removerLabelEInput() {
  const labelAprovado = document.querySelector('label[for="m-aprovado"]');
  const inputAprovado = document.getElementById('m-aprovado');

  const labelImplementado = document.querySelector('label[for="m-implementado"]');
  const inputImplementado = document.getElementById('m-implementado');


  if (labelAprovado && inputAprovado) {
    labelAprovado.remove(); // Remove o elemento label
    inputAprovado.remove(); // Remove o elemento input
  } else {
    console.log('Os elementos não foram encontrados.');
  }
  if (labelImplementado && inputImplementado) {
    labelImplementado.remove(); // Remove o elemento label
    inputImplementado.remove(); // Remove o elemento input
  } else {
    console.log('Os elementos não foram encontrados.');
  }
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.data}</td>
    <td>${item.proponente}</td>
    <td>${item.demanda}</td>
    <td>${item.desenvolvedor}</td>
    <td>${item.aprovado}</td>
    <td>${item.implementado}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sProponente.value == '' || sDemanda.value == '' || sDesenvolvedor.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].data = sData.value
    itens[id].proponente = sProponente.value
    itens[id].demanda = sDemanda.value
    itens[id].desenvolvedor = sDesenvolvedor.value
    itens[id].aprovado = sAprovado.valueOf
    itens[id].implementado = sImplementado.valueOf
  } else {
    itens.push({'data': sDate, 'proponente': sProponente.value, 'demanda': sDemanda.value, 'desenvolvedor': sDesenvolvedor.value, 'aprovado': 'Não', 'implementado': 'Não'})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
