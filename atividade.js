let despesas = [];
let indiceEdicao = null;

function adicionarDespesa() {
    const descricao = document.getElementById('descricao').value;
    const categoria = document.getElementById('categoria').value;
    const data = document.getElementById('data').value;
    const valor = parseFloat(document.getElementById('valor').value)
    const pagamento = document.getElementById('pagamento').value;

    if (categoria && descricao && valor && data && pagamento) {
        const despesa = { categoria, descricao, valor, data, pagamento };
        despesas.push(despesa);
        atualizarListaDespesas();
        resetarFormulario();
    } else {
        alert('Complete todas as opçoes');
    }
}

function editarDespesa(indice) {
    const despesa = despesas[indice];
    document.getElementById('categoria').value = despesa.categoria;
    document.getElementById('descricao').value = despesa.descricao;
    document.getElementById('valor').value = despesa.valor;
    document.getElementById('data').value = despesa.data;
    document.getElementById('pagamento').value = despesa.pagamento;
    indiceEdicao = indice;
    document.getElementById('botaoAdicionarDespesa').style.display = 'none';
    document.getElementById('botaoSalvarDespesa').style.display = 'inline';
}

function salvarDespesa() {
    const categoria = document.getElementById('categoria').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;
    const pagamento = document.getElementById('pagamento').value;

    if (categoria && descricao && valor && data && pagamento) {
        despesas[indiceEdicao] = { categoria, descricao, valor, data, pagamento };
        atualizarListaDespesas();
        resetarFormulario();
        indiceEdicao = null;
        document.getElementById('botaoAdicionarDespesa').style.display = 'inline';
        document.getElementById('botaoSalvarDespesa').style.display = 'none';
    } else {
        alert('Complete todas as opçoes');
    }
}

function excluirDespesa(indice) {
    despesas.splice(indice, 1);
    atualizarListaDespesas();
}

function resetarFormulario() {
    document.getElementById('categoria').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('data').value = '';
    document.getElementById('pagamento').value = '';
}

function atualizarListaDespesas() {
    const listaDespesas = document.getElementById('lista-despesas');
    listaDespesas.innerHTML = '';

    const despesasPorCategoria = {};

    despesas.forEach((despesa, indice) => {
        if (!despesasPorCategoria[despesa.categoria]) {
            despesasPorCategoria[despesa.categoria] = [];
        }
        despesasPorCategoria[despesa.categoria].push({ ...despesa, indice });
    });

    for (const categoria in despesasPorCategoria) {
        const despesasCategoria = despesasPorCategoria[categoria];
        const cabecalhoCategoria = document.createElement('h2');
        cabecalhoCategoria.textContent = categoria;
        listaDespesas.appendChild(cabecalhoCategoria);

        despesasCategoria.forEach(despesa => {
            const itemLista = document.createElement('div');
            itemLista.textContent = `${despesa.descricao} - R$ ${despesa.valor.toFixed(2)} - ${despesa.data} - ${despesa.pagamento}`;
            
            const botaoEditar = document.createElement('button');
            botaoEditar.textContent = 'Editar';
            botaoEditar.onclick = () => editarDespesa(despesa.indice);
            
            const botaoExcluir = document.createElement('button');
            botaoExcluir.textContent = 'Excluir';
            botaoExcluir.onclick = () => excluirDespesa(despesa.indice);

            itemLista.appendChild(botaoEditar);
            itemLista.appendChild(botaoExcluir);
            listaDespesas.appendChild(itemLista);
        });
    }
}


