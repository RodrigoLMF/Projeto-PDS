document.getElementById("btnCadastrar").addEventListener("click", function () {
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;

    var userData = {
        login: login,
        password: password
    };

    fetch('http://localhost:3000/cadastrarUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Usuário cadastrado com sucesso!') {
                window.location.href = '/homepage';
            } else {
                alert('Já existe um cadastro para este login. Tente outro login');
                window.location.href = '/cadastro'
            }
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.');
            window.location.href = '/cadastro'
        });
});