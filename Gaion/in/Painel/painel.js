document.addEventListener("DOMContentLoaded", () => {
  // Elementos de exibição
  const valorEl = document.getElementById("valor");
  const vendidosEl = document.getElementById("vendidos");
  const vistoEl = document.getElementById("visto");

  // Dropdown personalizado
  const dropdown = document.getElementById('dropdown');
  const toggleBtn = dropdown.querySelector('.dropdown-toggle');
  const menu = dropdown.querySelector('.dropdown-menu');
  const items = dropdown.querySelectorAll('.dropdown-item');

  // Função utilitária
  function vh(valor) {
    return window.innerHeight * (valor / 100);
  }

  // === Dropdown behavior ===
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    menu.classList.toggle('show', !isExpanded);
  });

  // Fechar ao clicar fora
  document.addEventListener('click', () => {
    menu.classList.remove('show');
    toggleBtn.setAttribute('aria-expanded', 'false');
  });

  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // === Dados e configurações ===
  const dados = {
    total: { valorLiquido: 90000.00, vendidos: 148, visto: 3700 },
    mes: { valorLiquido: 28000.00, vendidos: 48, visto: 700 },
    semana: { valorLiquido: 6400.00, vendidos: 12, visto: 450 },
    ontem: { valorLiquido: 980.50, vendidos: 5, visto: 200 },
    hoje: { valorLiquido: 1500.75, vendidos: 3, visto: 50 },
  };

  const ordemPeriodos = ["total", "mes", "semana", "ontem", "hoje"];
  const labels = { 
    ontem: "Ontem", 
    hoje: "Hoje", 
    semana: "Semana passada", // Corrigi "passado" → "passada"
    mes: "Mês passado", 
    total: "Total"  
  };

  // Mapear texto exibido → chave
  const textoParaChave = {
    "Total": "total",
    "Mês passado": "mes",
    "Semana passada": "semana",
    "Ontem": "ontem",
    "Hoje": "hoje"
  };

  // === Gráfico ===
  const ctx = document.getElementById('graficoValorLiquido').getContext('2d');
  const grafico = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ordemPeriodos.map(p => labels[p]),
      datasets: [{
        label: 'Valor Líquido (R$)',
        data: ordemPeriodos.map(p => dados[p].valorLiquido),
        borderColor: '#4b2b2b',
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: '#4b2b2b',
        pointHoverRadius: 5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Estatística',
          color: '#4b2b2b',
          font: { size: vh(2), family: 'Arial, sans-serif', weight: 'bold' },
          padding: { top: 0, bottom: 10, left: 10 }
        },
        legend: { display: false },
        tooltip: {
          backgroundColor: '#fff',
          titleColor: '#4b2b2b',
          bodyColor: '#4b2b2b',
          borderColor: '#4b2b2b',
          borderWidth: 1,
          displayColors: false,
          titleFont: { size: vh(2) },
          bodyFont: { size: vh(1.8) },
          callbacks: {
            label: ctx => `R$ ${ctx.parsed.y.toLocaleString('pt-BR')}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#4b2b2b', font: { size: vh(1.5) } }
        },
        y: {
          grid: { display: false },
          ticks: { display: false }
        }
      }
    }
  });

  function calcularRaio() {
    return window.innerWidth < 780 ? 4.5 : 7;
  }

  function atualizarDados(periodo) {
    const info = dados[periodo];
    if (!info) return;

    // Atualizar texto dos cards
    valorEl.textContent = info.valorLiquido.toLocaleString("pt-BR", { 
      style: "currency", 
      currency: "BRL" 
    });
    vendidosEl.textContent = info.vendidos;
    vistoEl.textContent = info.visto;

    // Destacar ponto no gráfico
    const destaque = ordemPeriodos.indexOf(periodo);
    grafico.data.datasets[0].pointRadius = 
      ordemPeriodos.map((_, i) => i === destaque ? calcularRaio() : 3);

    grafico.update();
  }

  // === Vincular dropdown aos dados ===
  items.forEach(item => {
    item.addEventListener('click', () => {
      const textoSelecionado = item.textContent.trim();
      const chave = textoParaChave[textoSelecionado];
      
      if (chave) {
        toggleBtn.textContent = textoSelecionado;
        menu.classList.remove('show');
        toggleBtn.setAttribute('aria-expanded', 'false');
        atualizarDados(chave);
      }
    });
  });

  // Atualizar ao redimensionar a janela
  window.addEventListener("resize", () => {
    // Reaplicar o destaque com novo raio
    const textoAtual = toggleBtn.textContent.trim();
    const chaveAtual = textoParaChave[textoAtual];
    if (chaveAtual) {
      atualizarDados(chaveAtual);
    }
  });

  // Inicializar com "Hoje"
  atualizarDados("hoje");
  toggleBtn.textContent = "Hoje";
});