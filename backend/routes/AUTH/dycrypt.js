var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../../database');

// POST request for user login
router.post('/', function (req, res, next) {
    const headerToken = req.header('Authorization');

    if (!headerToken) {
        return res.status(401).send({ message: 'No token provided' });
    }

    // Assuming the token is sent as 'Bearer <token>'
    const token = headerToken.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized: Invalid token' });
        }

        // Token is valid
        // Proceed with your logic here, for example:
        // req.user = decoded;

        db.query(`
        SELECT * FROM userrole
        JOIN users ON users.id = userrole.user_id
        WHERE userrole.id = ?;
        `, [decoded.userrole_id], function (err, results) {
            if (err) {
                return res.status(500).send({ message: 'Database query error', error: err.message });
            }
            // Send the results back to the client
            return res.status(200).send({ message: 'Account and Token verified', account: results });

        });

        // return res.status(200).send({ message: 'Token verified', user: decoded });
    });
});

module.exports = router;
