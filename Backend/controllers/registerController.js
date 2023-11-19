const userDB = require ('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    try {
        // check for duplicate usernames in the db
        const foundUser = await userDB._getUserByUN(user);
        if (foundUser.length > 0) return res.sendStatus(409); //Conflict 
    
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        await userDB._createUser(user, hashedPwd);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };