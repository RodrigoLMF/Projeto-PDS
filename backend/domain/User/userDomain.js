// Código de domínio (regras de negócio)
// Totalmente independente de tecnologia

var repositorio = null;

function configRepo(repo) {
  repositorio = repo; 
}

function registerUser(email, password) {
  
}

module.exports.registerUser = registerUser;
module.exports.configRepo = configRepo;