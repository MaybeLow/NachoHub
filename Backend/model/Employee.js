const db = require('../config/dbConn');

const _getEmployees = async () => {
    const sql = "SELECT * FROM `EMPLOYEES`";
    const [result] = await db.execute(sql);
    return result;
}

const _getEmployee = async (id) => {
    const sql = "SELECT * FROM `EMPLOYEES` WHERE `employee_id` = ?";
    const [result] = await db.execute(sql, [id], (err) => {
        if (err) throw err;
    });
    return result;
}

const _createEmployee = async (firstname, lastname) => {
    const sql = "INSERT INTO `EMPLOYEES` (firstname, lastname) VALUES (?, ?)";
    const [result] = await db.execute(sql, [firstname, lastname], (err) => {
        if (err) throw err; 
    });
    return result;
} 

const _updateEmployee = async (id, firstname, lastname) => {
    var sql;
    var values;

    if (!firstname && lastname) {
        sql = "UPDATE `EMPLOYEES` SET `lastname` = ? WHERE `employee_id` = ?";
        values = [lastname, id];
    } else if (!lastname && firstname) {
        sql = "UPDATE `EMPLOYEES` SET `firstname` = ? WHERE `employee_id` = ?";
        values = [firstname, id];
    } else if (firstname && lastname) {
        sql = "UPDATE `EMPLOYEES` SET `firstname` = ?, `lastname` = ? WHERE `employee_id` = ?";
        values = [firstname, lastname, id];
    } else {
        return null;
    }

    const [result] = await db.execute(sql, values, (err) => {
        if (err) throw err;
    });
    return result;
}

const _deleteEmployee = async (id) => {
    const sql = "DELETE FROM `EMPLOYEES` WHERE `employee_id` = ?";
    const [result] = await db.execute(sql, [id], (err) => {
        if (err) throw err;
    });
    return result;
}

module.exports = { 
    _getEmployees, 
    _getEmployee, 
    _createEmployee, 
    _updateEmployee, 
    _deleteEmployee 
}