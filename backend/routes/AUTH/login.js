var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../../database');

// POST request for user login
router.post('/',
  [
    body('username', 'Username is required').notEmpty(),
    body('password', 'Password is required').notEmpty()
  ], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Check if user exists
    db.query(`SELECT users.*, userrole.*
    FROM users 
    INNER JOIN userrole ON users.id = userrole.user_id 
    WHERE users.username = ?
    `,
      [username], function (err, users) {
        if (err) {
          return res.status(500).send({ message: 'Database query error', error: err.message });
        }

        if (users.length === 0) {
          return res.status(400).send({ message: 'Invalid username or password' });
        }

        const user = users[0];

        // Compare passwords
        bcrypt.compare(password, user.password, function (err, isMatch) {
          if (err) {
            return res.status(500).send({ message: 'Error in password comparison', error: err.message });
          }

          if (!isMatch) {
            return res.status(400).send({ message: 'Invalid username or password' });
          }

          // User authenticated, generate a JWT token
          const token = jwt.sign({ userrole_id: user.id, extra: { user_id: user.user_id, role_id: user.role_id}  }, process.env.JWT_SECRET, { expiresIn: '1h' });

          // Return the response with the role message
          return res.status(200).send({ message: 'Login successful', token: token, userinfo: user });

        });
      });
  }
);

module.exports = router;
