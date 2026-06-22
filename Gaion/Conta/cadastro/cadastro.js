const dia = document.getElementById('dia');
const mes = document.getElementById('mes');
const ano = document.getElementById('ano');

const anoAtual = new Date().getFullYear();

// DIA
dia.addEventListener('input', function () {
  if (Number(this.value) > 31) {
    this.value = 31;
  }

  if (this.value.length === 2) {
    mes.focus();
  }
});

// MÊS
mes.addEventListener('input', function () {
  if (Number(this.value) > 12) {
    this.value = 12;
  }

  if (this.value.length === 2) {
    ano.focus();
  }
});

// ANO
ano.addEventListener('input', function () {
  this.value = this.value.slice(0, 4);

  if (Number(this.value) > anoAtual) {
    this.value = anoAtual;
  }

  validarData();
});

// Apenas números
[dia, mes, ano].forEach(input => {
  input.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
});

// VALIDAR DATA REAL
function validarData() {
  const d = Number(dia.value);
  const m = Number(mes.value);
  const a = Number(ano.value);

  if (
    dia.value.length === 2 &&
    mes.value.length === 2 &&
    ano.value.length === 4
  ) {
    const data = new Date(a, m - 1, d);

    const dataValida =
      data.getFullYear() === a &&
      data.getMonth() === m - 1 &&
      data.getDate() === d;

    if (!dataValida) {
      alert('Data inválida');
      dia.value = '';
      mes.value = '';
      ano.value = '';
      dia.focus();
    }
  }
}

// Lógica de CPF e Checkbox Vendedor
const cpfInput = document.getElementById('cpf');
if (cpfInput) {
  cpfInput.setAttribute('maxlength', '14');
  cpfInput.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    valor = valor.slice(0, 11);
    valor = valor.replace(/^(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    valor = valor.replace(/(\d{3})(\d{2})$/, "$1-$2");
    e.target.value = valor;
  });
}

const checkbox = document.getElementById("caixinha");
if (checkbox) {
  checkbox.addEventListener('change', function() {
    const elements = document.querySelectorAll('.Vendedor, .Conteiner');
    elements.forEach(el => el.classList.toggle('Not'));
  });
}