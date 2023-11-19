const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const access_token = authHeader.split(' ')[1];

    jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            req.role = decoded.UserInfo.role;
            req.id = decoded.UserInfo.id;
            next();
        }
    );
}

module.exports = verifyJWT