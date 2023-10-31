
class Bill {
    constructor(billID, userID, name, value, type, divide, repeat, num_parts, first_payment, payday) {
      this.billID = billID;
      this.userID = userID;
      this.name = name;
      this.value = value;
      this.type = type;
      this.divide = divide;
      this.repeat = repeat;
      this.num_parts = num_parts;
      this.first_payment = first_payment;
      this.payday = payday;
    }
    
    setId(id) {
        this.id = id;
    }
}

module.exports.Bill = Bill;