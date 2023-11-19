const db = require('../config/dbConn');

const _getUsers = async () => {
    const sql = "SELECT * FROM `users`";
    const [result] = await db.execute(sql);
    return result;
}

const _getUserByID = async (id) => {
    const sql = "SELECT * FROM `users` WHERE `user_id` = ?";
    const [result] = await db.execute(sql, [id], (err) => {
        if (err) throw err;
    });
    return result;
}

const _getUserByUN = async (username) => {
    const sql = "SELECT * FROM `users` WHERE `username` = ?";
    const [result] = await db.execute(sql, [username], (err) => {
        if (err) throw err;
    });
    return result;
}

const _deleteUser = async (id) => {
    const sql = "DELETE FROM `users` WHERE `user_id` = ?";
    const [result] = await db.execute(sql, [id], (err) => {
        if (err) throw err;
    });
    return result;
}

const _updateRefreshToken = async (id, refreshToken) => {
    const sql = "UPDATE `users` SET `refreshtoken` = ? WHERE `user_id` = ?";
    const [result] = await db.execute(sql, [refreshToken, id], (err) => {
        if (err) throw err;
    })
    return result;
}

const _getRefreshToken = async (refreshToken) => {
    const sql = "SELECT * FROM `users` WHERE `refreshToken` = ?";
    const [result] = await db.execute(sql, [refreshToken], (err) => {
        if (err) throw err;
    });
    return result;
}

const _createUser = async (username, password) => {
    const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)"
    const [result] = await db.execute(sql, [username, password, 2001], (err) => {
        if (err) throw err;
    })
    return result;
}

module.exports = {
    _getUsers,
    _getUserByID,
    _getUserByUN,
    _updateRefreshToken,
    _deleteUser,
    _getRefreshToken,
    _createUser
}