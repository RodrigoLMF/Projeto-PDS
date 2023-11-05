// Código de domínio (regras de negócio)
// Totalmente independente de tecnologia
var Notification = require('./Notification.js').Notification
const PERIOD = 5;

function configRepo(repo) {
    repository = repo;
}

function calculateDaysUntilDueDate(billDate, endDate) {
    let days = Math.floor((endDate - billDate) / (1000 * 60 * 60 * 24));
    return days;
}

function createMessage(bill, endDate) {
    let message
    days = calculateDaysUntilDueDate(bill.payday, endDate);

    if (days == 0) {
        message = "A conta " + bill.name + " vence hoje."

    } else {
        message = "A conta " + bill.name + " vence em " + days + " dias."
    }
    return message;
}

function createNotifications(billList, endDate) {
    let notificationsList = [];

    for (let i = 0; i < billList.length; i++) {
        let message = createMessage(billList[i], endDate);
        let newNotification = new Notification(0, billList[i].userId, billList[i].billId, message, new Date());
        notificationsList.push(newNotification);
    }

    return notificationsList;
}

function getUserNotifications(userId) {

    var startDate = new Date();  // current date
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + PERIOD);

    return new Promise((resolve, reject) => {
        repository.getBillsWithinPeriod(userId, startDate, endDate).then((billList) => {
            let notificationsList = createNotifications(billList, endDate);
            resolve(notificationsList);
        }).catch((err) => {
            console.error("Erro ao buscar contas:", err);
            reject(new Error('Erro ao buscar contas. Por favor, tente novamente mais tarde.'));
        });
    });

}

module.exports.configRepo = configRepo;
module.exports.getUserNotifications = getUserNotifications;