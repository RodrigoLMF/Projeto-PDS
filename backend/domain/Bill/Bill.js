
class Bill {
    constructor(billID, userID, billName, value, type, divide, repeat, numParts, firstPayment, payday) {
        this.billID = billID;
        this.userID = userID;
        this.name = billName;
        this.value = value;
        this.type = type;
        this.divide = divide;
        this.repeat = repeat;
        this.numParts = numParts;
        this.firstPayment = firstPayment;
        this.payday = payday;
    }

    setId(id) {
        this.id = id;
    }

    clone() {
        return new Bill(
            this.billID,
            this.userID,
            this.name,
            this.value,
            this.type,
            this.divide,
            this.repeat,
            this.numParts,
            new Date(this.firstPayment),
            new Date(this.payday));
    }
}

module.exports.Bill = Bill;