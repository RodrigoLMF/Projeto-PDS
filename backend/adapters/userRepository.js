var con = require('./config-connection');

class UserRepo {
    constructor() {

    }

    addUser(user) {
        return new Promise((resolve, reject) => {
            // Não é necessário incluir USER_ID no INSERT para permitir autoincremento
            var sql = "INSERT INTO USER (USER_LOGIN, USER_PASSWORD) VALUES ('" + user.login + "','" + user.password + "')";
            con.query(sql, (err, result) => {
                if (err) return reject(err);
                console.log("1 record inserted, ID: " + result.insertId);
                return resolve(result);
            });
        });
    }
    

    findByLogin(login) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM USER WHERE USER_LOGIN = '" + login + "'";
            con.query(sql, (err, result) => {
                if (err) return reject(err);
                return (resolve(result));
            });
        });
    };

    async add(user) {
        const result = await this.findByLogin(user);
        return (result);
    }

    async find(login) {
        const result = await this.findByLogin(login);
        return (result);
    }

}

module.exports.UserRepo = new UserRepo();