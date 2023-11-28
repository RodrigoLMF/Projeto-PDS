document.getElementById('loginForm').addEventListener('click', function () {
    //event.preventDefault();

    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;

    var userData = {
        login: login,
        password: password,
    };

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Login bem-sucedido') {
                window.location.href = '/homepage';
            } else {
                alert('Credenciais inválidas. Por favor, tente novamente.');
                window.location.href = '/'
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao fazer login. Por favor, tente novamente mais tarde.');
            window.location.href = '/'
        });
});
