var connection = require('./config-connection');
const getBillsWithinPeriod = require('./billRepository').getBillsWithinPeriod;

const add = async (notification) => {
    try {
        const [bills] = await connection.execute(`INSERT INTO NOTIFICATION 
            (USER_ID, BILL_ID, NOTIFICATION_DESC, ISSUE_DATE)
            VALUES ( ?, ?, ?, ? )`,
            [notification.userId, notification.billId, notification.description, notification.issueDate]);
            return query;

    } catch (error) {
        console.error('Erro ao cadastrar notificações:', error);
        throw error;
    }
}

module.exports.add = add;
module.exports.getBillsWithinPeriod = getBillsWithinPeriod;

