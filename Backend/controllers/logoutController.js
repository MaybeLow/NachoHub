const userDB = require ('../model/User');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken
    
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    try {
        const foundUser = await userDB._getRefreshToken(refreshToken);
        console.log(foundUser);
        if (!foundUser.length > 0) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true  });
            return res.sendStatus(401);
        }

        // Delete refreshToken in db
        await userDB._updateRefreshToken(foundUser[0].user_id, null);
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true  });
        res.status(200).json({ 'logout_user':  foundUser[0].username, 'cleared_refreshtoken': refreshToken });
    } catch (err) {
        res.sendStatus(500);
    }
    
}

module.exports = { handleLogout }