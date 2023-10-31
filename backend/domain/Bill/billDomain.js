// Código de domínio (regras de negócio)
// Totalmente independente de tecnologia
var Bill = require('./Bill.js').Bill

var repository = null;

function configRepo(repo) {
    repository = repo;
}

function splitBill() {

}

function repeatBill() {

}

function registerBill(userID, name, value, type, divide, repeat, num_parts, first_payment, payday) {
    // resolver userID depois
    newBill = new Bill(0, userID, name, value, type, divide, repeat, num_parts, first_payment, payday)
    return new Promise((resolve, reject) => {
        if (divide) {  // resolver depois
            splitBill()
        } else if (repeat) {  // resolver depois
            repeatBill()
        } else {
            repository.add(newBill).then((result) => {
                //newBill.setId = result.id
                resolve({ message: 'Usuário cadastrado com sucesso!' });
            }).catch((err) => {
                console.log("Erro ao cadastrar conta:", err);
                reject(new Error('Erro ao cadastrar conta. Por favor, tente novamente mais tarde.'));
            });
        }

    });
}


module.exports.configRepo = configRepo;
module.exports.registerBill = registerBill;