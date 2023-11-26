const userDB = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    try {
        var foundUser = await userDB._getUserByUN(user);
        if (foundUser.length > 0) {
            foundUser = foundUser[0]
        } else {
            return res.sendStatus(401);
        } 

        // evaluate password 
        const match = await bcrypt.compare(pwd, foundUser.password);

        if (match) {
            // create JWTs
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "role": foundUser.role,
                        "id": foundUser.user_id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10m' }
            );
            const refreshToken = jwt.sign(
                { "id": foundUser.user_id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            // Saving refreshToken with current user
            await userDB._updateRefreshToken(foundUser.user_id, refreshToken);

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000, secure: true });

            // Send authorization role and access token to user
            const role = foundUser.role;
            res.status(200).json({ role, accessToken });

        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.sendStatus(500);
    }
}

module.exports = { handleLogin };