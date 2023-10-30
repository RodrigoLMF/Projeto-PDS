// Código de domínio (regras de negócio)
// Totalmente independente de tecnologia
var User = require('./User.js')
var repositorio = null;

function configRepo(repo) {
    repositorio = repo;
}

function registerUser(login, password) {
    repositorio.find(login).then((result) => {
        if (result == '') {
            var newUser = new User.User(1, login, password);
            repositorio.add(newUser).then((result) => {

            }).catch((err) => {  // resolver depois
                console.log("Erro: "+ err)
                return false
            });
            return true
        } else {
            throw new Error("Usuario ja cadastrado.");
        }
    }).catch((err) => {  // resolver depois
        console.log("Erro: " + err)
        return false
    });

}

module.exports.registerUser = registerUser;
module.exports.configRepo = configRepo;