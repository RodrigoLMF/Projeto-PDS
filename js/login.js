document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const login = document.getElementById('login').value;
  const password = document.getElementById('password').value;

  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Login bem-sucedido') {
      window.location.href = 'html/homepage.html'; 
    } else {
      alert('Credenciais inválidas. Por favor, tente novamente.');
    }
  })
  .catch(error => {
    console.error('Erro:', error);
    alert('Erro ao fazer login. Por favor, tente novamente mais tarde.');
  });
});
