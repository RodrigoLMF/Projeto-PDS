
class Notification {
    constructor(notificationId, userId, billId, description, issueDate) {
        this.notificationId = notificationId;
        this.userId = userId;
        this.billId = billId;
        this.description = description;
        this.issueDate = issueDate;
    }
}

module.exports.Notification = Notification;