const tarefas = [
    {
        nome: 'Comprar Leite',
        categoria: 'compras',
        realizada: false
    },
    {
        nome: 'Escutar chimbinha ',
        categoria: 'lazer',
        realizada: true
    },
    {
        nome: 'Brincar com o cachorro',
        categoria: 'lazer',
        realizada: true
    }
]

const insereTarefaNaPagina = (tarefa) => {
    const estiloMarcado = tarefa.realizada ? 'marcado' : 'empty'
    const listaEl = document.getElementById('lista-tarefas')
    const tarefaEl = document.createElement('li')

    listaEl.appendChild(tarefaEl)

    tarefaEl.classList.add('item-tarefa')
    tarefaEl.classList.add(estiloMarcado)
    tarefaEl.classList.add(`categoria-${tarefa.categoria}`)
    tarefaEl.innerText = tarefa.nome
    tarefaEl.addEventListener('click', concluirTarefa)
}

const incluiNovaTarefa = () => {
    const nomeTarefa = document.getElementById('nova-tarefa-nome')
    const categoriaTarefa = document.getElementById('nova-tarefa-categoria')
    const tarefa = {
        nome: nomeTarefa.value,
        categoria: categoriaTarefa.value,
        realizada: false
    }

    tarefas.push(tarefa)
    insereTarefaNaPagina(tarefa)
    nomeTarefa.value = ""
    nomeTarefa.focus()
}

const filtraPorCategoria = () => {
    const filtroCategoria = document.getElementById('filtro-de-categoria').value
    const verificaOpcaoTodos = filtroCategoria === ''
    const itensTarefaEl = document.getElementsByClassName('item-tarefa')

    for (let i = 0; i < itensTarefaEl.length; i++) {
        const itemEl = itensTarefaEl[i]
        const verificaCategoria = itemEl.classList.contains(`categoria-${filtroCategoria}`)

        if (!verificaCategoria && !verificaOpcaoTodos) {
            itemEl.classList.add('retido-no-filtro')
        } else {
            itemEl.classList.remove('retido-no-filtro')
        }
    }
}

const concluirTarefa = (itemTarefa) => {
    const itemTarefaEl = itemTarefa.currentTarget
    itemTarefaEl.classList.toggle('marcado')
    tarefas.find(tarefa => tarefa.nome === itemTarefaEl.innerText).realizada = !tarefas.find(tarefa => tarefa.nome === itemTarefaEl.innerText).realizada
}

const buttonEl = document.getElementById('incluir-nova-tarefa')
buttonEl.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        incluiNovaTarefa()
    }
})