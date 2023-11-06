// Código de domínio (regras de negócio)
// Totalmente independente de tecnologia
var User = require('./User.js').User;

var repository = null;

function configRepo(repo) {
    repository = repo;
}

function registerUser(login, password) {
    return new Promise((resolve, reject) => {
        repository.find(login)
            .then((result) => {
                if (result.length === 0) {
                    var newUser = new User(1, login, password);
                    repository.add(newUser)
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

function authenticateUser(login, password) {
    return new Promise((resolve, reject) => {
        repository.find(login)
            .then(users => {
                if (users.length > 0) {
                    const user = users[0];
                    if (user.password === password) {
                        resolve(new User(user.id, user.login, user.password));
                    } else {
                        resolve(null);
                    }
                } else {
                    resolve(null);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar usuário no banco de dados:', error);
                reject(error);
            });
    });
}

module.exports.authenticateUser = authenticateUser;
module.exports.registerUser = registerUser;
module.exports.configRepo = configRepo;