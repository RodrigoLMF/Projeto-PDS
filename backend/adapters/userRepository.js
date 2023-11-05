var connection = require('./config-connection');
const User = require('../domain/User/User').User;

function createUserList(query) {
    let userList = []

    for (let i = 0; i < query.length; i++) {
        userList.push(new User(
            query[i].USER_ID,
            query[i].USER_LOGIN,
            query[i].USER_PASSWORD));
    }

    return (userList);
};

const find = async (login) => {
    try {
        const [query] = await connection.execute(`SELECT * FROM USER WHERE USER_LOGIN = ?`, [login]);
        userList = createUserList(query);
        return userList;

    } catch (error) {
        console.error('Erro ao buscar a usuário:', error);
        throw error;
    }
};

const add = async (user) => {
    try {
        const [query] = await connection.execute(`INSERT INTO USER (USER_LOGIN, USER_PASSWORD) 
            VALUES ( ?, ? )`, [user.login, user.password]);
        return query.insertId;

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw error;
    }
};

module.exports.find = find;
module.exports.add = add;