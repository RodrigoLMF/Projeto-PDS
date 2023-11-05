// Código de domínio (regras de negócio)
// Totalmente independente de tecnologia
var Notification = require('./Notification.js').Notification

function configRepo(repo) {
    repository = repo;
}

function createNotification() {

}

function getUserNotifications(userId) {
    
}

module.exports.configRepo = configRepo;
module.exports.createNotification = createNotification;
module.exports.getUserNotifications = getUserNotifications;