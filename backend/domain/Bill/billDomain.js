// Código de domínio (regras de negócio)
// Totalmente independente de tecnologia
var Bill = require('./Bill.js').Bill

var repository = null;

function configRepo(repo) {
    repository = repo;
}
function getNewDate(date, i) {
    date.setMonth(date.getMonth() + i);
}

function getNewValue(bill) {
    return bill.value / bill.numParts;
}

/* 
 * Função que ajusta valor conforme o tipo da conta.
 * Contas do tipo Débito devem possuir valor negativo e
 * contas do tipo Ganho devem possuir valor positivo.
 */
function verifyValue(bill) {
    if ((bill.type == 'D' && bill.value > 0) ||
        (bill.type == 'G' && bill.value < 0)) {
        bill.value = -1 * bill.value;
    }
}
function splitBill(bill) {
    var billList = [];

    for (let i = 0; i < bill.numParts; i++) {
        let newBill = bill.clone();

        getNewDate(newBill.payday, i);
        newBill.value = getNewValue(bill);

        billList.push(newBill);
    }
    return billList;
}

function repeatBill(bill) {
    var billList = [];

    for (let i = 0; i < bill.numParts; i++) {
        let newBill = bill.clone();
        getNewDate(newBill.payday, i);
        billList.push(newBill);
    }

    return billList;
}

function registerBill(userID, billName, value, type, divide, repeat, numParts, firstPayment, payday) {

    newBill = new Bill(0, userID, billName, value, type, divide, repeat, numParts, firstPayment, payday)
    verifyValue(newBill);

    let billList;

    return new Promise((resolve, reject) => {
        if (divide) {
            billList = splitBill(newBill);

        } else if (repeat) {
            billList = repeatBill(newBill);

        } else {
            billList = [newBill];
        }

        for (let i = 0; i < billList.length; i++) {

            repository.add(billList[i]).then((result) => {
                //newBill.setId = result.id
                resolve({ message: 'Conta cadastrada com sucesso!' });
            }).catch((err) => {
                console.log("Erro ao cadastrar conta:", err);
                reject(new Error('Erro ao cadastrar conta. Por favor, tente novamente mais tarde.'));
            });

        }

    });
}

function payBill(billId) {
    return new Promise((resolve, reject) => {
        repository.payBill(billId).then((result) => {
            resolve({ message: 'Conta quitada com sucesso!' });
        }).catch((err) => {
            console.log("Erro ao quitar conta:", err);
            reject(new Error('Erro ao quitar conta. Por favor, tente novamente mais tarde.'));
        });
    });
}

function getAllBills(userId){
    return new Promise((resolve, reject) => {
        repository.getAllBillsByUserId(userId).then((bills) => {
            resolve(bills);
        }).catch((err) => {
            console.error("Erro ao buscar contas:", err);
            reject(new Error('Erro ao buscar contas. Por favor, tente novamente mais tarde.'));
        });
    });
}

function getBillsWithinPeriod(userId, startDate, endDate) {
    return new Promise((resolve, reject) => {
        repository.getBillsWithinPeriod(userId, startDate, endDate).then((billList) => {
            resolve(billList);
        }).catch((err) => {
            console.error("Erro ao buscar contas:", err);
            reject(new Error('Erro ao buscar contas. Por favor, tente novamente mais tarde.'));
        });
    }); 
}


function getParcialBalanceAll(userId, type) {
    return new Promise((resolve, reject) => {
      getAllBills(userId) // Chama a função para obter todas as contas
        .then((bills) => {
          // Filtra as contas
          const parcialBills = bills.filter((bill) => bill.type === type);
          
          // Calcula o somatório dos valores das contas positivas
          const sum = parcialBills.reduce((total, bill) => total + bill.value, 0);
          
          resolve(sum); // Retorna o somatório
        })
        .catch((error) => {
          console.error('Erro ao buscar e calcular contas parciais:', error);
          reject(new Error('Erro ao buscar contas parciais. Por favor, tente novamente mais tarde.'));
        });
    });
}

function getTotalBalanceAll(userId) {
    return new Promise((resolve, reject) => {
      getAllBills(userId) // Chama a função para obter todas as contas
        .then((bills) => {
          // Filtra as contas 
          const parcialBills = bills.filter((bill) => bill.type === 'G' || bill.type === 'D');
          
          // Calcula o somatório dos valores das contas positivas
          const sum = parcialBills.reduce((total, bill) => total + bill.value, 0);
          
          resolve(sum); // Retorna o somatório
        })
        .catch((error) => {
          console.error('Erro ao buscar e calcular contas parciais:', error);
          reject(new Error('Erro ao buscar contas parciais. Por favor, tente novamente mais tarde.'));
        });
    });
}

module.exports.configRepo = configRepo;
module.exports.registerBill = registerBill;
module.exports.payBill = payBill;
module.exports.getAllBills = getAllBills;
module.exports.getParcialBalanceAll = getParcialBalanceAll;
module.exports.getTotalBalanceAll = getTotalBalanceAll;
module.exports.getBillsWithinPeriod = getBillsWithinPeriod;