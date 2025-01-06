const JWT = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || '$uperMan@123';

function createTokenForUser(user) {
    const payload = {
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
        },
    };
    return JWT.sign(payload, secret, { expiresIn: '24h' });
}

function validateToken(token) {
    try {
        return JWT.verify(token, secret);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}

module.exports = { createTokenForUser, validateToken };
