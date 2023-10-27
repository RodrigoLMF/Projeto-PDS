// Código de domínio (regras de negócio)
// Totalmente independente de tecnologia

var repositorio = null;

function configRepo(repo) {
  repositorio = repo; 
}



module.exports.configRepo = configRepo;