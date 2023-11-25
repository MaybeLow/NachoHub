const userDB = require ('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    try {
        const foundUser = await userDB._getRefreshToken(refreshToken);

        if (!foundUser.length > 0) return res.sendStatus(403); //Forbidden 
        // evaluate jwt 
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser[0].user_id !== decoded.id) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "username": decoded.username,
                            "role": foundUser[0].role,
                            "id": foundUser[0].id
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '10m' }
                );
                const role = foundUser[0].role;
                res.status(200).json({ role, accessToken })
            }
        );
    } catch (err) {
        res.sendStatus(500);
    }
    
}

module.exports = { handleRefreshToken }