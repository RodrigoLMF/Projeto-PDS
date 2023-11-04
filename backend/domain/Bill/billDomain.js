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