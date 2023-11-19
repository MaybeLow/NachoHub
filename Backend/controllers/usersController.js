const userDB = require('../model/User');

const getUsers = async (_, res) => {
    try {
        res.status(200).json(await userDB._getUsers());
    } catch (err) {
        return res.sendStatus(500);
    }
}

const getUserByID = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.sendStatus(400);
    }

    try {
        res.status(200).json(await userDB._getUserByID(id));
    } catch (err) {
        return res.sendStatus(500);
    }
}

const getUserByUN = async (req, res) => {
    const username = req.params.user;
    if (!username) {
        return res.sendStatus(400);
    }

    try {
        res.status(200).json(await userDB._getUserByUN(username));
    } catch (err) {
        return res.sendStatus(500);
    }
}

const deleteUser = async (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.sendStatus(400);
    }

    try {
        res.status(200).json(await userDB._deleteUser(id));
    } catch (err) {
        return res.sendStatus(500);
    }
}

module.exports = {
    getUsers,
    getUserByID,
    getUserByUN,
    deleteUser
}