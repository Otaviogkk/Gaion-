function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    if (email && senha) {
        alert("Login realizado com: " + email);
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

function loginSocial(platform) {
    alert("Login com " + platform);
}
