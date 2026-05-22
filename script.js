const barbeiros = [
  {
    id: 1,
    nome: "Pedro",
    especialidade: "Degradê, freestyle e cortes modernos",
    foto: "assets/barbeiro1.jpg",
    telefone: "5543999999999"
  },
  {
    id: 2,
    nome: "Lucas",
    especialidade: "Barba, navalhado e acabamento",
    foto: "assets/barbeiro2.jpg",
    telefone: "5543988888888"
  },
  {
    id: 3,
    nome: "Mateus",
    especialidade: "Nevou, platinado e química",
    foto: "assets/barbeiro3.jpg",
    telefone: "5543977777777"
  }
];

let barbeiroSelecionado = null;
let servicoSelecionado = null;
let dataSelecionada = null;
let horarioSelecionado = null;
let mesSelecionadoOffset = 0;

const agendamentos = [
  {
    barbeiroId: 1,
    data: 19,
    mesOffset: 0,
    horario: "15:00"
  }
];

const servicos = [
  {
    nome: "Corte masculino padrão",
    categoria: "cortes",
    descricao: "Degradê, social e estilos modernos",
    preco: 55,
    tempo: 45
  },
  {
    nome: "Corte americano",
    categoria: "cortes",
    descricao: "Estilo americano moderno",
    preco: 50,
    tempo: 45
  },
  {
    nome: "Corte navalhado",
    categoria: "cortes",
    descricao: "Finalização navalhada",
    preco: 60,
    tempo: 50
  },
  {
    nome: "Corte infantil",
    categoria: "cortes",
    descricao: "Corte masculino infantil",
    preco: 60,
    tempo: 45
  },
  {
    nome: "Corte temático",
    categoria: "cortes",
    descricao: "Cortes personalizados e desenhos",
    preco: 70,
    tempo: 60
  },
  {
    nome: "Barba padrão",
    categoria: "barba",
    descricao: "Acabamento e alinhamento",
    preco: 45,
    tempo: 30
  },
  {
    nome: "Barba italiana",
    categoria: "barba",
    descricao: "Barba estilizada premium",
    preco: 50,
    tempo: 40
  },
  {
    nome: "Corte + barba",
    categoria: "barba",
    descricao: "Combo completo",
    preco: 85,
    tempo: 75
  },
  {
    nome: "Corte + barba + sobrancelha",
    categoria: "barba",
    descricao: "Pacote premium",
    preco: 90,
    tempo: 90
  },
  {
    nome: "Luzes + corte incluso",
    categoria: "quimica",
    descricao: "Reflexo/luzes",
    preco: 180,
    tempo: 150
  },
  {
    nome: "Platinado (nevou)",
    categoria: "quimica",
    descricao: "Platinado completo",
    preco: 250,
    tempo: 180
  },
  {
    nome: "Selagem masculina",
    categoria: "quimica",
    descricao: "Tratamento capilar",
    preco: 70,
    tempo: 60
  },
  {
    nome: "Selagem + corte",
    categoria: "quimica",
    descricao: "Selagem com corte",
    preco: 130,
    tempo: 90
  },
  {
    nome: "Pezinho",
    categoria: "extras",
    descricao: "Acabamento rápido",
    preco: 20,
    tempo: 15
  },
  {
    nome: "Sobrancelha",
    categoria: "extras",
    descricao: "Modelagem navalha",
    preco: 20,
    tempo: 15
  }
];

const cardsContainer = document.querySelector(".cards");
const barbeirosContainer = document.querySelector(".barbeiros-container");
const calendario = document.querySelector("#calendario");
const horariosContainer = document.querySelector(".horarios");
const confirmacao = document.querySelector("#confirmacao");

const resumoBarbeiro = document.querySelector("#resumoBarbeiro");
const resumoServico = document.querySelector("#resumoServico");
const resumoHorario = document.querySelector("#resumoHorario");
const resumoValor = document.querySelector("#resumoValor");
const resumoSinal = document.querySelector("#resumoSinal");

const secaoServicos = document.querySelector("#servicos");
const secaoAgenda = document.querySelector("#agenda");

function esconderFluxoInicial() {
  secaoServicos.style.display = "none";
  secaoAgenda.classList.remove("mostrar");
}

function mostrarServicos() {
  secaoServicos.style.display = "block";
}

function renderizarBarbeiros() {
  barbeirosContainer.innerHTML = "";

  barbeiros.forEach(barbeiro => {
    barbeirosContainer.innerHTML += `
      <div
        class="barbeiro-card"
        onclick="selecionarBarbeiro(event, ${barbeiro.id})"
      >
        <img src="${barbeiro.foto}" alt="${barbeiro.nome}">

        <div class="barbeiro-info">
          <h3>${barbeiro.nome}</h3>
          <p>${barbeiro.especialidade}</p>
        </div>
      </div>
    `;
  });
}

function selecionarBarbeiro(event, id) {
  barbeiroSelecionado = barbeiros.find(barbeiro => barbeiro.id === id);

  servicoSelecionado = null;
  dataSelecionada = null;
  horarioSelecionado = null;

  calendario.innerHTML = "";
  horariosContainer.innerHTML = "";
  secaoAgenda.classList.remove("mostrar");

  document.querySelectorAll(".barbeiro-card").forEach(card => {
    card.classList.remove("barbeiro-selecionado");
  });

  event.currentTarget.classList.add("barbeiro-selecionado");

  mostrarServicos();

  document.querySelector("#servicos").scrollIntoView({
    behavior: "smooth"
  });
}

function renderizarServicos(lista) {
  cardsContainer.innerHTML = "";

  lista.forEach(servico => {
    cardsContainer.innerHTML += `
      <div class="servico-card">
        <div class="servico-card-content">
          <h3>${servico.nome}</h3>
          <p>${servico.descricao}</p>

          <div class="info">
            <span>⏱ ${servico.tempo} min</span>
            <strong>R$ ${servico.preco}</strong>
          </div>

          <button onclick="selecionarServico(event, '${servico.nome}')">
            Escolher
          </button>
        </div>
      </div>
    `;
  });
}

function filtrarServicos(categoria) {
  if (categoria === "todos") {
    renderizarServicos(servicos);
    return;
  }

  const filtrados = servicos.filter(servico => servico.categoria === categoria);
  renderizarServicos(filtrados);
}

function selecionarServico(event, nome) {
  servicoSelecionado = servicos.find(servico => servico.nome === nome);

  dataSelecionada = null;
  horarioSelecionado = null;
  horariosContainer.innerHTML = "";

  document.querySelectorAll(".servico-card").forEach(card => {
    card.classList.remove("servico-selecionado");
  });

  event.currentTarget
    .closest(".servico-card")
    .classList.add("servico-selecionado");

  secaoAgenda.classList.add("mostrar");

  gerarCalendario();

  document.querySelector("#agenda").scrollIntoView({
    behavior: "smooth"
  });
}

function gerarCalendario() {
  calendario.innerHTML = "";
  horariosContainer.innerHTML = "";

  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mesAtual = hoje.getMonth();
  const diaHoje = hoje.getDate();

  const mesCalendario = mesAtual + mesSelecionadoOffset;

  const primeiroDia = new Date(ano, mesCalendario, 1);
  const ultimoDia = new Date(ano, mesCalendario + 1, 0);

  const nomeMes = primeiroDia.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric"
  });

  calendario.innerHTML += `
    <div class="controle-mes">
      <button onclick="trocarMes(0)">
        Mês atual
      </button>

      <strong>${nomeMes}</strong>

      <button onclick="trocarMes(1)">
        Próximo mês
      </button>
    </div>
  `;

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  diasSemana.forEach(dia => {
    calendario.innerHTML += `
      <div class="dia-semana">${dia}</div>
    `;
  });

  for (let i = 0; i < primeiroDia.getDay(); i++) {
    calendario.innerHTML += `<div></div>`;
  }

  for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
    const data = new Date(ano, mesCalendario, dia);
    const diaDaSemana = data.getDay();

    const domingo = diaDaSemana === 0;

    const diaPassado =
      mesSelecionadoOffset === 0 &&
      dia < diaHoje;

    const bloqueado = domingo || diaPassado;

    const hojeClasse =
      mesSelecionadoOffset === 0 &&
      dia === diaHoje
        ? "dia-hoje"
        : "";

    calendario.innerHTML += `
      <div
        class="dia ${bloqueado ? "dia-fechado" : ""} ${hojeClasse}"
        onclick="${bloqueado ? "" : `selecionarDia(event, ${dia})`}"
      >
        ${dia}
      </div>
    `;
  }
}

function trocarMes(offset) {
  mesSelecionadoOffset = offset;
  dataSelecionada = null;
  horarioSelecionado = null;

  gerarCalendario();
}

function selecionarDia(event, dia) {
  dataSelecionada = dia;
  horarioSelecionado = null;

  document.querySelectorAll(".dia").forEach(item => {
    item.classList.remove("dia-selecionado");
  });

  event.currentTarget.classList.add("dia-selecionado");

  gerarHorarios();
}

function converterMinutosParaHorario(minutos) {
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;

  return `${String(horas).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function gerarHorarios() {
  horariosContainer.innerHTML = "";

  if (!servicoSelecionado || !dataSelecionada || !barbeiroSelecionado) {
    return;
  }

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth() + mesSelecionadoOffset;

  const data = new Date(ano, mes, dataSelecionada);
  const diaDaSemana = data.getDay();

  let inicioExpediente;

  if (diaDaSemana === 1) {
    inicioExpediente = 13 * 60;
  } else {
    inicioExpediente = 8 * 60;
  }

  const fimExpediente = 20 * 60;
  const intervalo = 30;

  for (
    let horario = inicioExpediente;
    horario + servicoSelecionado.tempo <= fimExpediente;
    horario += intervalo
  ) {
    const horarioFormatado = converterMinutosParaHorario(horario);

    const horarioOcupado = agendamentos.some(agendamento => {
      return (
        agendamento.barbeiroId === barbeiroSelecionado.id &&
        agendamento.data === dataSelecionada &&
        agendamento.mesOffset === mesSelecionadoOffset &&
        agendamento.horario === horarioFormatado
      );
    });

    if (horarioOcupado) {
      continue;
    }

    horariosContainer.innerHTML += `
      <div
        class="horario"
        onclick="selecionarHorario(event, '${horarioFormatado}')"
      >
        ${horarioFormatado}
      </div>
    `;
  }

  if (horariosContainer.innerHTML === "") {
    horariosContainer.innerHTML = `
      <p class="sem-horarios">
        Nenhum horário disponível para este dia.
        Escolha outra data.
      </p>
    `;
  }
}

function selecionarHorario(event, horario) {
  horarioSelecionado = horario;

  document.querySelectorAll(".horario").forEach(item => {
    item.classList.remove("horario-selecionado");
  });

  event.currentTarget.classList.add("horario-selecionado");

  atualizarResumo();

  confirmacao.classList.add("mostrar");

  document.querySelector("#confirmacao").scrollIntoView({
    behavior: "smooth"
  });
}

function atualizarResumo() {
  const hoje = new Date();

  const dataAgendamento = new Date(
    hoje.getFullYear(),
    hoje.getMonth() + mesSelecionadoOffset,
    dataSelecionada
  );

  const dia = String(dataAgendamento.getDate()).padStart(2, "0");
  const mes = String(dataAgendamento.getMonth() + 1).padStart(2, "0");

  const dataFormatada = `${dia}/${mes}`;

  resumoBarbeiro.textContent = barbeiroSelecionado.nome;
  resumoServico.textContent = servicoSelecionado.nome;
  resumoHorario.textContent = `${dataFormatada} às ${horarioSelecionado}`;
  resumoValor.textContent = `R$ ${servicoSelecionado.preco}`;
  resumoSinal.textContent = `R$ ${(servicoSelecionado.preco / 2).toFixed(2)}`;
}

function mostrarPagamentoPix() {
  const nomeCliente = document.querySelector("#nomeCliente").value;
  const telefoneCliente = document.querySelector("#telefoneCliente").value;

  if (!nomeCliente || !telefoneCliente) {
    alert("Preencha seu nome e WhatsApp para continuar.");
    return;
  }

  const pagamentoPix = document.querySelector("#pagamentoPix");
  const valorPix = document.querySelector("#valorPix");

  const valorSinal = servicoSelecionado.preco / 2;

  valorPix.textContent = `R$ ${valorSinal.toFixed(2)}`;

  pagamentoPix.classList.add("mostrar");

  pagamentoPix.scrollIntoView({
    behavior: "smooth"
  });
}

function confirmarAgendamento() {
  const nomeCliente = document.querySelector("#nomeCliente").value;
  const telefoneCliente = document.querySelector("#telefoneCliente").value;
  const observacoesCliente = document.querySelector("#observacoesCliente").value;

  if (!nomeCliente || !telefoneCliente) {
    alert("Preencha seu nome e WhatsApp para continuar.");
    return;
  }

  if (
    !barbeiroSelecionado ||
    !servicoSelecionado ||
    !dataSelecionada ||
    !horarioSelecionado
  ) {
    alert("Escolha barbeiro, serviço, data e horário antes de continuar.");
    return;
  }

  const horarioJaOcupado = agendamentos.some(agendamento => {
    return (
      agendamento.barbeiroId === barbeiroSelecionado.id &&
      agendamento.data === dataSelecionada &&
      agendamento.mesOffset === mesSelecionadoOffset &&
      agendamento.horario === horarioSelecionado
    );
  });

  if (horarioJaOcupado) {
    alert("Esse horário acabou de ser ocupado. Escolha outro horário.");
    gerarHorarios();
    return;
  }

  const valorSinal = servicoSelecionado.preco / 2;

  const hoje = new Date();

  const dataAgendamento = new Date(
    hoje.getFullYear(),
    hoje.getMonth() + mesSelecionadoOffset,
    dataSelecionada
  );

  const ano = dataAgendamento.getFullYear();
  const mes = String(dataAgendamento.getMonth() + 1).padStart(2, "0");
  const dia = String(dataAgendamento.getDate()).padStart(2, "0");

  const dataCompleta = `${dia}/${mes}/${ano}`;
  const criadoEm = new Date().toISOString();

  agendamentos.push({
    id: Date.now(),
    status: "pendente",
    barbeiroId: barbeiroSelecionado.id,
    barbeiro: barbeiroSelecionado.nome,
    telefoneBarbeiro: barbeiroSelecionado.telefone,
    servico: servicoSelecionado.nome,
    data: dataSelecionada,
    mesOffset: mesSelecionadoOffset,
    dataCompleta: dataCompleta,
    criadoEm: criadoEm,
    horario: horarioSelecionado,
    cliente: nomeCliente,
    telefone: telefoneCliente,
    observacoes: observacoesCliente,
    valor: servicoSelecionado.preco,
    sinal: valorSinal
  });

  console.log("Agendamentos salvos:", agendamentos);

  const mensagem = `
Olá ${barbeiroSelecionado.nome}, quero confirmar meu agendamento na Sr. Pedro Barbearia.

Cliente: ${nomeCliente}
WhatsApp: ${telefoneCliente}

Barbeiro: ${barbeiroSelecionado.nome}
Serviço: ${servicoSelecionado.nome}
Data: ${dataCompleta}
Horário: ${horarioSelecionado}

Valor total: R$ ${servicoSelecionado.preco}
Sinal 50%: R$ ${valorSinal.toFixed(2)}

Observações: ${observacoesCliente || "Nenhuma"}

Vou enviar o comprovante do Pix para confirmar o horário.
`;

  const numeroBarbearia = barbeiroSelecionado.telefone;

  const link = `https://wa.me/${numeroBarbearia}?text=${encodeURIComponent(mensagem)}`;

  window.open(link, "_blank");

  document.querySelector("#nomeCliente").value = "";
  document.querySelector("#telefoneCliente").value = "";
  document.querySelector("#observacoesCliente").value = "";

  horarioSelecionado = null;

  document.querySelectorAll(".horario").forEach(item => {
    item.classList.remove("horario-selecionado");
  });

  confirmacao.classList.remove("mostrar");

  document.querySelector("#pagamentoPix").classList.remove("mostrar");

  gerarHorarios();
}

function alternarGaleria() {
  const galeriaConteudo = document.querySelector("#galeriaConteudo");
  const botaoGaleria = document.querySelector("#botaoGaleria");

  galeriaConteudo.classList.toggle("mostrar");

  if (galeriaConteudo.classList.contains("mostrar")) {
    botaoGaleria.textContent = "Esconder nosso trabalho";
  } else {
    botaoGaleria.textContent = "Ver nosso trabalho";
  }
}

function alternarHistoria() {
  const historiaConteudo = document.querySelector("#historiaConteudo");
  const botaoHistoria = document.querySelector("#botaoHistoria");

  historiaConteudo.classList.toggle("mostrar");

  if (historiaConteudo.classList.contains("mostrar")) {
    botaoHistoria.textContent = "Esconder história";
  } else {
    botaoHistoria.textContent = "Conhecer nossa história";
  }
}

function alternarMenu() {
  const menuLinks = document.querySelector("#menuLinks");
  menuLinks.classList.toggle("mostrar");
}

document.querySelectorAll(".menu-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector("#menuLinks").classList.remove("mostrar");
  });
});

window.addEventListener("scroll", () => {
  const menu = document.querySelector(".menu-premium");

  if (window.scrollY > 40) {
    menu.classList.add("menu-scroll");
  } else {
    menu.classList.remove("menu-scroll");
  }
});

function abrirSecaoMenu(idSecao) {
  const secoes = [
    "#galeria",
    "#historia",
    "#avaliacoes"
  ];

  secoes.forEach(secaoId => {
    const secao = document.querySelector(secaoId);

    if (secaoId === idSecao) {
      secao.classList.add("mostrar");
    } else {
      secao.classList.remove("mostrar");
    }
  });

  document.querySelector(idSecao).scrollIntoView({
    behavior: "smooth"
  });

  document.querySelector("#menuLinks").classList.remove("mostrar");
}

function irParaAgendamento() {
  document.querySelector("#galeria").classList.remove("mostrar");
  document.querySelector("#historia").classList.remove("mostrar");
  document.querySelector("#avaliacoes").classList.remove("mostrar");

  document.querySelector("#barbeiros").scrollIntoView({
    behavior: "smooth"
  });

  document.querySelector("#menuLinks").classList.remove("mostrar");
}

function voltarParaInicio() {
  document.querySelector("#galeria").classList.remove("mostrar");
  document.querySelector("#historia").classList.remove("mostrar");
  document.querySelector("#avaliacoes").classList.remove("mostrar");

  document.querySelector("#inicio").scrollIntoView({
    behavior: "smooth"
  });

  document.querySelector("#menuLinks").classList.remove("mostrar");
}

renderizarBarbeiros();
renderizarServicos(servicos);
esconderFluxoInicial();