const { get } = require('http');
var connection = require('./config-connection');

const add = async (notification) => {
    const [query] = await connection.execute(``);
    return query;
}

const getNotificationsByUserId = async (userId) => {
    const [query] = await connection.execute(``);
    return query;
}

module.exports.add = add;
module.exports.getNotificationsByUserId = getNotificationsByUserId;
