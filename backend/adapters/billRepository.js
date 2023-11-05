var connection = require('./config-connection');

const add = async (bill) => {
    // Converte data para formato mysql
    firstPayment = bill.firstPayment.toISOString().split('T')[0]
    payday = bill.payday.toISOString().split('T')[0]

    const [query] = await connection.execute(`INSERT INTO BILL (USER_ID, BILL_NAME, BILL_VALUE, 
        BILL_TYPE, BILL_DIVIDE, BILL_REPEAT, BILL_NUM_PARTs, BILL_FIRST_PAYMENT, BILL_PAYDAY)
        VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [bill.userID, bill.name, bill.value, bill.type,
        bill.divide, bill.repeat, bill.numParts, firstPayment, payday]);
    return query;
};

const payBill = async (billId) => {
    const [query] = await connection.execute(`UPDATE BILL SET BILL_TYPE = 'P' WHERE BILL_ID = (?)`, [billId]);
    return query;
}

module.exports.add = add;
module.exports.payBill = payBill;