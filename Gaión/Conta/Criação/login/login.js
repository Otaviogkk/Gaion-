
document.addEventListener("DOMContentLoaded", () => {

  
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


  const checkbox = document.getElementById("caixinha"); 
  const form = document.querySelector(".Vendedor");          
checkbox.addEventListener('change', function() {
  const forms = document.querySelectorAll('.Vendedor');
  forms.forEach(form => form.classList.toggle('Not'));
});

});