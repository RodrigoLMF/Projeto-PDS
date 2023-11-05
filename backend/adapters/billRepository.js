var connection = require('./config-connection');
const Bill = require('../domain/Bill/Bill').Bill;

function createBillList(query) {
    let billList = []

    for (let i = 0; i < query.length; i++) {
        billList.push(new Bill(
            query[i].BILL_ID,
            query[i].USER_ID,
            query[i].BILL_NAME,
            query[i].BILL_VALUE,
            query[i].BILL_TYPE,
            query[i].BILL_DIVIDE,
            query[i].BILL_REPEAT,
            query[i].BILL_NUM_PARTS,
            new Date(query[i].BILL_FIRST_PAYMENT),
            new Date(query[i].BILL_PAYDAY)))
    }
    return (billList);
};

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
};

const getAllBillsByUserId = async (userId) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM BILL WHERE USER_ID = ?`, [userId]);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar as contas:', error);
        throw error;
    }
};

const getBillsWithinPeriod = async (userId, startDate, endDate) => {
    // Converte data para formato mysql
    startDate = startDate.toISOString().split('T')[0]
    endDate = endDate.toISOString().split('T')[0]
    try {
        const [query] = await connection.execute(`SELECT * FROM BILL 
            WHERE USER_ID = ? AND BILL_PAYDAY >= ? AND BILL_PAYDAY <= ?
            ORDER BY BILL_PAYDAY DESC`, [userId, startDate, endDate]);

        billList = createBillList(query);
        return billList;

    } catch (error) {
        console.error('Erro ao buscar as contas:', error);
        throw error;
    }
};

// const getBillsIdsWithinPeriod = async (userId, startDate, endDate) => {
//     getBillsWithinPeriod(userId, startDate, endDate)
//         .then((billList) => {
//             let billIds = []
//             for (let i = 0; i < billList.length; i++) {
//                 billIds.push(billList[i].billId);
//             }
//             console.log(billIds);
//             return billIds;
//         }).catch((err) => {
//             console.error("Erro ao buscar contas:", err);
//             throw error;
//         });
// };

module.exports.add = add;
module.exports.payBill = payBill;
module.exports.getAllBillsByUserId = getAllBillsByUserId;
module.exports.getBillsWithinPeriod = getBillsWithinPeriod;
// module.exports.getBillsIdsWithinPeriod= getBillsIdsWithinPeriod;