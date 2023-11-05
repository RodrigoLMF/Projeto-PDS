// Código de domínio (regras de negócio)
// Totalmente independente de tecnologia
var User = require('./User.js').User;

var repositorio = null;

function configRepo(repo) {
    repositorio = repo;
}

function registerUser(login, password) {
    return new Promise((resolve, reject) => {
        repositorio.find(login)
            .then((result) => {
                if (result.length === 0) {
                    var newUser = new User(1, login, password);
                    repositorio.add(newUser)
                        .then((result) => {
                            newUser.id = result;
                            resolve({ message: 'Usuário cadastrado com sucesso!' });
                        })
                        .catch((err) => {
                            console.log("Erro ao cadastrar usuário:", err);
                            reject(new Error('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.'));
                        });
                } else {
                    reject(new Error('Usuário já cadastrado.'));
                }
            })
            .catch((err) => {
                console.log("Erro ao verificar usuário existente:", err);
                reject(new Error('Erro ao verificar usuário existente. Por favor, tente novamente mais tarde.'));
            });
    });
}


module.exports.registerUser = registerUser;
module.exports.configRepo = configRepo;