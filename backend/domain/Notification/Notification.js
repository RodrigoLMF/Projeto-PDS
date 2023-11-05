
class Notification {
    constructor(notificationId, userId, description) {
        this.notificationId = notificationId;
        this.userId = userId;
        this.description = description;
    }
}

module.exports.Notification = Notification;