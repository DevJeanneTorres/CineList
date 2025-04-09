const form = document.getElementById('formFuncionario');
const lista = document.getElementById('listaFuncionarios');
const mensagem = document.getElementById('mensagem');
const secaoVisualizar = document.getElementById('secaoVisualizar');
const secaoAdicionar = document.getElementById('secaoAdicionar');
const linkVisualizar = document.getElementById('linkVisualizar');
const linkAdicionar = document.getElementById('linkAdicionar');

let funcionarios = [];

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const emailCorp = document.getElementById('emailCorp').value.trim();
    const cargo = document.getElementById('cargo').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const dataContratacao = document.getElementById('dataContratacao').value;
    const situacao = document.getElementById('situacao').value;
    const dataDemissao = document.getElementById('dataDemissao').value;
    const senha = document.getElementById('senha').value.trim();

    if (!nome || !cpf || !email || !emailCorp || !cargo || !dataNascimento || !dataContratacao || !situacao || !senha) {
        mensagem.style.color = '#d32f2f';
        mensagem.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        return;
    }

    const novoFuncionario = {
        nome,
        cpf,
        email,
        emailCorp,
        cargo,
        dataNascimento,
        dataContratacao,
        situacao,
        dataDemissao: situacao === 'inativo' ? dataDemissao : '',
    };

    funcionarios.push(novoFuncionario);

    mensagem.style.color = '#2e7d32';
    mensagem.textContent = `Funcionário ${nome} cadastrado com sucesso!`;
    form.reset();
    document.getElementById('campoDemissao').style.display = 'none';
    atualizarLista();
});

function atualizarLista() {
    lista.innerHTML = '';
    funcionarios.forEach((f, index) => {
                const item = document.createElement('li');
                item.innerHTML = `
      <strong>${f.nome}</strong> - ${f.cargo}<br>
      CPF: ${f.cpf} | Email: ${f.email} | Corporativo: ${f.emailCorp}<br>
      Nascimento: ${f.dataNascimento} | Contratação: ${f.dataContratacao}<br>
      Situação: <span class="status">${f.situacao === 'ativo' ? 'Ativo' : 'Inativo'}</span>
      ${f.situacao === 'inativo' ? `| Demissão: ${f.dataDemissao}` : ''}<br>
      <button class="btn-editar" onclick="editarFuncionario(${index})">Editar</button>
    `;
    lista.appendChild(item);
  });
}

function editarFuncionario(index) {
  const f = funcionarios[index];

  document.getElementById('nome').value = f.nome;
  document.getElementById('cpf').value = f.cpf;
  document.getElementById('email').value = f.email;
  document.getElementById('emailCorp').value = f.emailCorp;
  document.getElementById('cargo').value = f.cargo;
  document.getElementById('dataNascimento').value = f.dataNascimento;
  document.getElementById('dataContratacao').value = f.dataContratacao;
  document.getElementById('situacao').value = f.situacao;

  if (f.situacao === 'inativo') {
    document.getElementById('campoDemissao').style.display = 'block';
    document.getElementById('dataDemissao').value = f.dataDemissao;
  } else {
    document.getElementById('campoDemissao').style.display = 'none';
    document.getElementById('dataDemissao').value = '';
  }

  secaoAdicionar.style.display = 'block';
  secaoVisualizar.style.display = 'none';
  mensagem.textContent = `Editando funcionário: ${f.nome}`;
}

linkVisualizar.addEventListener('click', () => {
  secaoVisualizar.style.display = 'block';
  secaoAdicionar.style.display = 'none';
});

linkAdicionar.addEventListener('click', () => {
  secaoVisualizar.style.display = 'none';
  secaoAdicionar.style.display = 'block';
  mensagem.textContent = '';
});