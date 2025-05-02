const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../config/index");
const RefreshToken = require("../models/Token"); // Fixed typo

class JWTServices {
    // Sign access token
    static signAccessToken(payload, expiryTime) {
        return JWT.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: expiryTime });
    }

    // Sign refresh token
    static signRefreshToken(payload, expiryTime) {
        return JWT.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: expiryTime });
    }

    // Verify access token
    static verifyAccessToken(token) {
        return JWT.verify(token, ACCESS_TOKEN_SECRET);
    }

    // Verify refresh token
    static verifyRefreshToken(token) {
        return JWT.verify(token, REFRESH_TOKEN_SECRET);
    }

    // Store refresh token in the database
    static async storeRefreshToken(token, userId) {
        try {
            const newToken = new RefreshToken({ // Fixed incorrect reference
                token: token,
                userId: userId
            });
            await newToken.save();
        } catch (error) {
            console.error("Error storing refresh token:", error);
        }
    }
}

// Correctly export the class
module.exports = JWTServices;