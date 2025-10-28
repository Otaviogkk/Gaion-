// login.js
/*function login() {
  const fname = document.getElementById('fname').value;
  const lname = document.getElementById('lname').value;
  
  if (!fname || !lname) {
    alert('Por favor, preencha todos os campos!');
    return false;
  }
  
  console.log('Login válido! Redirecionando...');
  window.location.href = '../../../inicio/tela-Iniciar.html';
  return false;
}*/
document.addEventListener("DOMContentLoaded", () => {
  // --- MÁSCARA DE TELEFONE ---
  const telefone = document.getElementById('telefone');
  telefone.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, ""); // remove não números
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2"); // adiciona parênteses
    valor = valor.replace(/(\d{5})(\d{4})$/, "$1-$2"); // adiciona hífen
    e.target.value = valor;
  });

  

  
  const cpfInput = document.getElementById('cpf');

  // define maxlength para o formato com pontos e hífen
  cpfInput.setAttribute('maxlength', '14');

  cpfInput.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, ""); // remove tudo que não é número
    valor = valor.slice(0, 11);                    // limita a 11 dígitos

    // aplica a máscara
    valor = valor.replace(/^(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    valor = valor.replace(/(\d{3})(\d{2})$/, "$1-$2");

    e.target.value = valor;
  });

  // --- DESBLOQUEIO DO INPUT ---
  const checkbox = document.getElementById('caixinha'); // a checkbox
  const input = document.getElementById('ID');           // o campo de senha
  // começa bloqueado
  input.disabled = true;
  checkbox.addEventListener('change', function() {
    input.disabled = !this.checked;
    if (this.checked) {
      input.focus(); // ativa foco
    } else {
      input.value = ''; // limpa se desmarcar
    }
  });
});