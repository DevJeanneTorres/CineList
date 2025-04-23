const form = document.getElementById('formTitulo');
const lista = document.getElementById('listaTitulos');
const mensagem = document.getElementById('mensagem');
const secaoVisualizar = document.getElementById('secaoVisualizar');
const secaoAdicionar = document.getElementById('secaoAdicionar');
const linkVisualizar = document.getElementById('linkVisualizar');
const linkAdicionar = document.getElementById('linkAdicionar');

let titulos = [];
let editandoIndice = null;

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const conteudo = document.getElementById('conteudo').value.trim();
    const genero = document.getElementById('genero').value.trim();
    const sinopse = document.getElementById('sinopse').value.trim();
    const temporada = document.getElementById('temporada').value;
    const episodio = document.getElementById('episodio').value;
    const classificacaoIndicativa = document.getElementById('classificacaoIndicativa').value;
    const cartazInput = document.getElementById('cartaz');
    const cartaz = cartazInput.files[0] ? URL.createObjectURL(cartazInput.files[0]) : '';


    if (!nome || !conteudo || !genero || !sinopse || !temporada || !episodio || !classificacaoIndicativa || !cartaz) {
        mensagem.style.color = '#d32f2f';
        mensagem.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        return;
    }

    const novoTitulo = {
        nome,
        conteudo,
        genero,
        sinopse,
        temporada,
        episodio,
        classificacaoIndicativa,
        cartaz
    };

    if (editandoIndice !== null) {
        titulos[editandoIndice] = novoTitulo;
        mensagem.style.color = '#2e7d32';
        mensagem.textContent = `Título "${nome}" atualizado com sucesso!`;
        editandoIndice = null;
    } else {
        titulos.push(novoTitulo);
        mensagem.style.color = '#2e7d32';
        mensagem.textContent = `Título "${nome}" cadastrado com sucesso!`;
    }

    form.reset();
    atualizarLista();
});

function atualizarLista() {
    lista.innerHTML = '';

    titulos.forEach((t, index) => {
        const item = document.createElement('li');
        item.classList.add('titulo-item');

        const duracao = t.conteudo === 'Filme'
            ? `Duração: ${t.duracaoFilme} min`
            : `Temporadas: ${t.temporada} | Episódios: ${t.episodio} | Duração do Episódio: ${t.duracaoEpisodio} min`;

        item.innerHTML = `
            <div class="info">
                <h3>${t.nome} (${t.conteudo}) - ${t.genero}</h3>
                <p>${duracao}</p>
                <p>Classificação: ${t.classificacaoIndicativa}</p>
                <p><em>${t.sinopse}</em></p>
                <div class="botoes">
                    <button onclick="editarTitulo(${index})">Editar</button>
                    <button onclick="excluirTitulo(${index})">Excluir</button>
                </div>
            </div>
            <div class="cartaz">
                <img src="${t.cartaz || 'placeholder.jpg'}" alt="Cartaz de ${t.nome}" />
            </div>
        `;
        lista.appendChild(item);
    });
}


function editarTitulo(index) {
    const t = titulos[index];

    document.getElementById('nome').value = t.nome;
    document.getElementById('conteudo').value = t.conteudo;
    document.getElementById('genero').value = t.genero;
    document.getElementById('sinopse').value = t.sinopse;
    document.getElementById('temporada').value = t.temporada;
    document.getElementById('episodio').value = t.episodio;
    document.getElementById('classificacaoIndicativa').value = t.classificacaoIndicativa;

    editandoIndice = index;
    secaoAdicionar.style.display = 'block';
    secaoVisualizar.style.display = 'none';
    mensagem.textContent = `Editando título: ${t.nome}`;
}

function excluirTitulo(index) {
    if (confirm('Tem certeza que deseja excluir este título?')) {
        titulos.splice(index, 1);
        atualizarLista();
        mensagem.textContent = 'Título excluído com sucesso!';
    }
}

linkVisualizar.addEventListener('click', () => {
    secaoVisualizar.style.display = 'block';
    secaoAdicionar.style.display = 'none';
    atualizarLista();
});

linkAdicionar.addEventListener('click', () => {
    secaoVisualizar.style.display = 'none';
    secaoAdicionar.style.display = 'block';
    mensagem.textContent = '';
    form.reset();
    editandoIndice = null;
});

const campoFilme = document.getElementById('campoFilme');
const campoSerieAnime = document.getElementById('campoSerieAnime');
const conteudoSelect = document.getElementById('conteudo');

conteudoSelect.addEventListener('change', () => {
    const tipo = conteudoSelect.value;
    if (tipo === 'Filme') {
        campoFilme.style.display = 'block';
        campoSerieAnime.style.display = 'none';
    } else if (tipo === 'Serie' || tipo === 'Anime') {
        campoFilme.style.display = 'none';
        campoSerieAnime.style.display = 'block';
    } else {
        campoFilme.style.display = 'none';
        campoSerieAnime.style.display = 'none';
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const conteudo = conteudoSelect.value.trim();
    const genero = document.getElementById('genero').value.trim();
    const sinopse = document.getElementById('sinopse').value.trim();
    const classificacaoIndicativa = document.getElementById('classificacaoIndicativa').value;

    let temporada = '', episodio = '', duracaoFilme = '', duracaoEpisodio = '';

    if (conteudo === 'Filme') {
        duracaoFilme = document.getElementById('duracaoFilme').value;
        if (!duracaoFilme) {
            mensagem.style.color = '#d32f2f';
            mensagem.textContent = 'Informe a duração do filme.';
            return;
        }
    } else if (conteudo === 'Serie' || conteudo === 'Anime') {
        temporada = document.getElementById('temporada').value;
        episodio = document.getElementById('episodio').value;
        duracaoEpisodio = document.getElementById('duracaoEpisodio').value;
        if (!temporada || !episodio || !duracaoEpisodio) {
            mensagem.style.color = '#d32f2f';
            mensagem.textContent = 'Preencha todas as informações da série ou anime.';
            return;
        }
    }

    const novoTitulo = {
        nome,
        conteudo,
        genero,
        sinopse,
        classificacaoIndicativa,
        temporada,
        episodio,
        duracaoFilme,
        duracaoEpisodio
    };

    if (editandoIndice !== null) {
        titulos[editandoIndice] = novoTitulo;
        mensagem.style.color = '#2e7d32';
        mensagem.textContent = `Título "${nome}" atualizado com sucesso!`;
        editandoIndice = null;
    } else {
        titulos.push(novoTitulo);
        mensagem.style.color = '#2e7d32';
        mensagem.textContent = `Título "${nome}" cadastrado com sucesso!`;
    }

    form.reset();
    campoFilme.style.display = 'none';
    campoSerieAnime.style.display = 'none';
    atualizarLista();
});

function atualizarLista() {
    lista.innerHTML = '';

    titulos.forEach((t, index) => {
        const item = document.createElement('li');
        let infoExtra = '';

        if (t.conteudo === 'Filme') {
            infoExtra = `Duração: ${t.duracaoFilme} min`;
        } else {
            infoExtra = `Temporadas: ${t.temporada} | Episódios: ${t.episodio} | Duração Ep.: ${t.duracaoEpisodio} min`;
        }

        item.innerHTML = `
            <strong>${t.nome}</strong> (${t.conteudo}) - ${t.genero}<br>
            ${infoExtra}<br>
            Classificação: ${t.classificacaoIndicativa}<br>
            <em>${t.sinopse}</em><br>
            <button onclick="editarTitulo(${index})">Editar</button>
            <button onclick="excluirTitulo(${index})">Excluir</button>
        `;
        lista.appendChild(item);
    });
}
