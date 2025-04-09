document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formFuncionario');
  const lista = document.getElementById('listaFuncionarios');
  const mensagem = document.getElementById('mensagem');
  const secaoVisualizar = document.getElementById('secaoVisualizar');
  const secaoAdicionar = document.getElementById('secaoAdicionar');
  const linkVisualizar = document.getElementById('linkVisualizar');
  const linkAdicionar = document.querySelector('#linkAdicionar');
  const linkRelatorio = document.querySelector('#linkRelatorio');
  const campoSenha = document.getElementById('campoSenha');

  let funcionarios = [];
  let indiceEdicao = null;

  form.addEventListener('submit', function (e) {
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
    const foto = document.getElementById('foto').files[0];
    const senha = document.getElementById('senha').value.trim();

    let fotoURL = '';
    if (foto) {
      fotoURL = URL.createObjectURL(foto);
    } else if (indiceEdicao !== null && funcionarios[indiceEdicao].fotoURL) {
      fotoURL = funcionarios[indiceEdicao].fotoURL;
    }

    if (!nome || !cpf || !email || !emailCorp || !cargo || !dataNascimento || !dataContratacao || !situacao) {
      mensagem.style.color = '#d32f2f';
      mensagem.textContent = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    if (indiceEdicao === null && !senha) {
      mensagem.style.color = '#d32f2f';
      mensagem.textContent = 'A senha é obrigatória para novo cadastro.';
      return;
    }

    const funcionario = {
      nome,
      cpf,
      email,
      emailCorp,
      cargo,
      dataNascimento,
      dataContratacao,
      situacao,
      dataDemissao: situacao === 'inativo' ? dataDemissao : '',
      fotoURL
    };

    if (indiceEdicao !== null) {
      funcionarios[indiceEdicao] = funcionario;
      mensagem.style.color = '#1976d2';
      mensagem.textContent = `Funcionário ${nome} atualizado com sucesso!`;
      indiceEdicao = null;
      document.getElementById('submitBtn').textContent = 'Cadastrar Funcionário';
    } else {
      funcionarios.push(funcionario);
      mensagem.style.color = '#2e7d32';
      mensagem.textContent = `Funcionário ${nome} cadastrado com sucesso!`;
    }

    form.reset();
    document.getElementById('campoDemissao').style.display = 'none';
    campoSenha.style.display = 'block';
    atualizarLista();
  });

  function atualizarLista() {
    lista.innerHTML = '';
    funcionarios.forEach((f, index) => {
      const item = document.createElement('li');
      item.innerHTML = `
        ${f.fotoURL ? `<img src="${f.fotoURL}" alt="Foto de ${f.nome}" style="width: 60px; height: 80px; object-fit: cover; border-radius: 4px;"><br>` : ''}
        <strong>${f.nome}</strong> - ${f.cargo}<br>
        CPF: ${f.cpf} | Email: ${f.email} | Corporativo: ${f.emailCorp}<br>
        Nascimento: ${f.dataNascimento} | Contratação: ${f.dataContratacao}<br>
        Situação: <span class="status">${f.situacao === 'ativo' ? 'Ativo' : 'Inativo'}</span>
        ${f.situacao === 'inativo' ? `| Demissão: ${f.dataDemissao}` : ''}<br>
        <button class="btn-editar" onclick="editarFuncionario(${index})">Editar</button>
        <button class="btn-excluir" onclick="excluirFuncionario(${index})">Excluir</button>
      `;
      lista.appendChild(item);
    });
  }

  window.editarFuncionario = function (index) {
    const f = funcionarios[index];
    indiceEdicao = index;

    document.getElementById('nome').value = f.nome;
    document.getElementById('cpf').value = f.cpf;
    document.getElementById('email').value = f.email;
    document.getElementById('emailCorp').value = f.emailCorp;
    document.getElementById('cargo').value = f.cargo;
    document.getElementById('dataNascimento').value = f.dataNascimento;
    document.getElementById('dataContratacao').value = f.dataContratacao;
    document.getElementById('situacao').value = f.situacao;
    document.getElementById('dataDemissao').value = f.dataDemissao || '';
    document.getElementById('campoDemissao').style.display = f.situacao === 'inativo' ? 'block' : 'none';
    campoSenha.style.display = 'none';

    document.getElementById('submitBtn').textContent = 'Atualizar Funcionário';

    secaoAdicionar.style.display = 'block';
    secaoVisualizar.style.display = 'none';
    mensagem.textContent = `Editando funcionário: ${f.nome}`;
  };

  window.excluirFuncionario = function (index) {
    const confirmacao = confirm("Tem certeza que deseja excluir este funcionário?");
    if (confirmacao) {
      funcionarios.splice(index, 1);
      atualizarLista();
      mensagem.style.color = '#d32f2f';
      mensagem.textContent = 'Funcionário excluído com sucesso!';
    }
  };

  linkVisualizar.addEventListener('click', (e) => {
    e.preventDefault();
    secaoVisualizar.style.display = 'block';
    secaoAdicionar.style.display = 'none';
  });

  linkAdicionar.addEventListener('click', (e) => {
    e.preventDefault();
    secaoVisualizar.style.display = 'none';
    secaoAdicionar.style.display = 'block';
    mensagem.textContent = '';
    indiceEdicao = null;
    campoSenha.style.display = 'block';
    document.getElementById('submitBtn').textContent = 'Cadastrar Funcionário';
  });

  linkRelatorio.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Relatório ainda não implementado.");
  });
});
