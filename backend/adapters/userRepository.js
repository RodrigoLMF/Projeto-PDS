var connection = require('./config-connection');

const find = async (login) => {
    const [query] = await connection.execute("SELECT * FROM USER WHERE USER_LOGIN = '"+ login +"'");
    console.log(query)
    return query;
};

const add = async (user) => {
    const [query] = await connection.execute("INSERT INTO USER (USER_LOGIN, USER_PASSWORD) VALUES ('" + user.login + "','" + user.password + "')");
    console.log(query)
    return query;
};

module.exports.find = find;
module.exports.add = add;
