const employeeDB = require('../model/Employee');

const getEmployees = async (_, res) => {
    try {
        res.status(200).json(await employeeDB._getEmployees());
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

const getEmployee = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.sendStatus(400);
    }

    try {
        const result = await employeeDB._getEmployee(id);
        console.log(result);
        if (result.length > 0) {
            res.json(result[0]);
        }
        else {
            return res.sendStatus(404);
        }
    } catch (err) {
        return res.sendStatus(500);
    }
}

const createEmployee = async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    if (!firstname || !lastname) {
        return res.sendStatus(400);
    }

    try {
        await employeeDB._createEmployee(firstname, lastname);
        res.status(201).json({ "message": `New employee created ${firstname} ${lastname}` });
    } catch (err) {
        return res.sendStatus(500);
    }
}

const updateEmployee = async (req, res) => {
    const id = req.body.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    if (!id) {
        return res.sendStatus(400);
    }

    try {
        const result = await employeeDB._updateEmployee(id, firstname, lastname);
        if (!result) return res.sendStatus(400);
        if (result.affectedRows > 0) {
            res.status(200).json({ "message": `Employee ${id} updated to ${firstname} ${lastname}` });
        } else {
            return res.sendStatus(404);
        }
        
    } catch (err) {
        return res.sendStatus(500);
    }
}

const deleteEmployee = async (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.sendStatus(400);
    }

    try {
        const result = await employeeDB._deleteEmployee(id);
        console.log(result);
        if (result.affectedRows > 0) {
            res.status(200).json({ "message": `Employee ${id} deleted` });
        } else {
            return res.sendStatus(404);
        }  
    } catch (err) {
        return res.sendStatus(500);
    }
}

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}