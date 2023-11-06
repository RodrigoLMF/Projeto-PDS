document.getElementById("btnCadastrar").addEventListener("click", function() {
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;

    var userData = {
        login: login,
        password: password
    };

    fetch('/cadastrarUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(data.message); 
        window.location.href = 'html/homepage.html'; 
    })
    .catch(error => {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.');
    });
});