// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    var nomeTarefa = document.getElementById("nomeTarefa").value;
    var descricaoTarefa = document.getElementById("descricaoTarefa").value;
    var tarefaRealizada = document.getElementById("realizadoTarefa").checked;
    var prioridadeTarefa = document.getElementById("prioridadeTarefa").value;

    fetch('https://desafio-todolist-production.up.railway.app/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeTarefa,
            descricao: descricaoTarefa,
            realizado: tarefaRealizada,
            prioridade: parseInt(prioridadeTarefa)
        })
    })
    .then(response => response.json())
    .then(data => {
        carregarTarefas();
        document.getElementById("formularioTarefa").reset(); // Limpa o formulário
    })
    .catch(error => console.error('Erro ao adicionar tarefa:', error));
}

// Função para carregar e exibir as tarefas existentes
function carregarTarefas() {
    fetch('https://desafio-todolist-production.up.railway.app/todos')
    .then(response => response.json())
    .then(tarefas => {
        exibirTarefas(tarefas);
    })
    .catch(error => console.error('Erro ao carregar tarefas:', error));
}

// Função para exibir as tarefas na lista
function exibirTarefas(tarefas) {
    var listaTarefas = document.getElementById("listaTarefas");
    listaTarefas.innerHTML = ""; // Limpa a lista antes de exibir as tarefas

    tarefas.forEach(tarefa => {
        var li = document.createElement("li");
        li.textContent = tarefa.nome + " - " + tarefa.descricao + " - " + (tarefa.realizado ? "Realizado" : "Não Realizado") + " - Prioridade: " + tarefa.prioridade;

        // Adiciona botões de atualizar e excluir
        var botaoAtualizar = document.createElement("button");
        botaoAtualizar.textContent = "Atualizar";
        botaoAtualizar.onclick = function() {
            mostrarMenuAtualizacao(tarefa);
        };
        li.appendChild(botaoAtualizar);

        var botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.onclick = function() {
            excluirTarefa(tarefa.id);
        };
        li.appendChild(botaoExcluir);

        listaTarefas.appendChild(li);
    });
}

// Função para mostrar o mini-menu de atualização
function mostrarMenuAtualizacao(tarefa) {
    var formularioAtualizacao = document.getElementById("formularioAtualizacaoTarefa");
    formularioAtualizacao.style.display = "block";

    // Preencher o mini-menu com os detalhes da tarefa selecionada
    document.getElementById("idTarefaAtualizacao").value = tarefa.id; // Armazena o ID da tarefa a ser atualizada
    document.getElementById("nomeTarefaAtualizacao").value = tarefa.nome;
    document.getElementById("descricaoTarefaAtualizacao").value = tarefa.descricao;
    document.getElementById("realizadoTarefaAtualizacao").checked = tarefa.realizado;
    document.getElementById("prioridadeTarefaAtualizacao").value = tarefa.prioridade;
}

// Função para esconder o mini-menu de atualização
function esconderMenuAtualizacao() {
    var formularioAtualizacao = document.getElementById("formularioAtualizacaoTarefa");
    formularioAtualizacao.style.display = "none";

    // Limpar os campos do mini-menu
    document.getElementById("idTarefaAtualizacao").value = "";
    document.getElementById("nomeTarefaAtualizacao").value = "";
    document.getElementById("descricaoTarefaAtualizacao").value = "";
    document.getElementById("realizadoTarefaAtualizacao").checked = false;
    document.getElementById("prioridadeTarefaAtualizacao").value = "1";
}

// Função para atualizar uma tarefa
function atualizarTarefa() {
    var idTarefa = document.getElementById("idTarefaAtualizacao").value; // Obtém o ID da tarefa a ser atualizada
    var nomeTarefa = document.getElementById("nomeTarefaAtualizacao").value;
    var descricaoTarefa = document.getElementById("descricaoTarefaAtualizacao").value;
    var tarefaRealizada = document.getElementById("realizadoTarefaAtualizacao").checked;
    var prioridadeTarefa = document.getElementById("prioridadeTarefaAtualizacao").value;

    fetch(`https://desafio-todolist-production.up.railway.app/todos/${idTarefa}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeTarefa,
            descricao: descricaoTarefa,
            realizado: tarefaRealizada,
            prioridade: parseInt(prioridadeTarefa)
        })
    })
    .then(response => {
        if (response.ok) {
            carregarTarefas(); // Atualiza a lista de tarefas após a atualização bem-sucedida
            esconderMenuAtualizacao(); // Esconde o mini-menu de atualização
        } else {
            throw new Error('Erro ao atualizar tarefa');
        }
    })
    .catch(error => console.error('Erro ao atualizar tarefa:', error));
}

// Função para excluir uma tarefa
function excluirTarefa(idTarefa) {
    fetch(`https://desafio-todolist-production.up.railway.app/todos/${idTarefa}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            carregarTarefas(); // Atualiza a lista de tarefas após a exclusão bem-sucedida
        } else {
            throw new Error('Erro ao excluir tarefa');
        }
    })
    .catch(error => console.error('Erro ao excluir tarefa:', error));
}

// Carregar as tarefas ao carregar a página
window.onload = carregarTarefas;
