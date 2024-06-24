var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../../database');

// POST request for user registration

router.post('/teacher',
[
  body('username', 'Username is required').notEmpty(),
  body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  body('firstname', 'First name is required').notEmpty(),
  body('lastname', 'Last name is required').notEmpty(),
  body('email', 'Valid email is required').isEmail(),
  body('DOB', 'Date of Birth is required').notEmpty(),
  body('address', 'Address is required').notEmpty(),
  body('role', 'Role is required').notEmpty().custom((value, { req }) => {
    const allowedRoles = ['teacher', 'manager'];
    if (!allowedRoles.includes(value)) {
      throw new Error('Role must be either "teacher" or "manager"');
    }
    // Check if role is teacher and teacher_number is provided
    if (value === 'teacher' && !req.body.teacher_number) {
      throw new Error('Teacher number is required for role teacher');
    }
    return true;
  }),
  // Optional validation for teacher_number, only check if it exists
  body('teacher_number').optional().isNumeric().withMessage('Teacher number must be numeric'),
], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, firstname, lastname, email, DOB, address, role, teacher_number } = req.body;
    var newrole = null;
    //make case switch for role
    switch (role) {
      case 'teacher':
        newrole = 2;
        break;
      case 'manager':
        newrole = 3;
        break;
      default:
        newrole = 2;
    }

    if (newrole == 1) {
      return res.status(401).send({ message: 'Cannot register as Student in Teacher register' });
    }

    // Hash the password
    bcrypt.hash(password, 10, function (err, hashedPassword) {
      if (err) {
        return res.status(500).send({ message: 'Error in password encryption', error: err.message });
      }

      // Check if username already exists
      db.query('SELECT * FROM users WHERE username = ?', [username], function (err, users) {
        if (err) {
          return res.status(500).send({ message: 'Database query error', error: err.message });
        }

        if (users.length > 0) {
          return res.status(400).send({ message: 'Username is already taken' });
        }

        // Insert user data into the database
        db.query('INSERT INTO users (username, password, firstname, lastname, email, DOB, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [username, hashedPassword, firstname, lastname, email, DOB, address], function (err, resultuser) {
            if (err) {
              return res.status(500).send({ message: 'Error in registration', error: err.message });
            }
            db.query('INSERT INTO userrole (user_id, role_id) VALUES (?, ?)',
              [resultuser.insertId, newrole], function (err, resultrole) {
                if (err) {
                  return res.status(500).send({ message: 'Error in registration', error: err.message });
                }
                if (newrole == 2) {
                  db.query('INSERT INTO docenten (user_role, docent_number) VALUES (?, ?)',
                    [resultrole.insertId, teacher_number], function (err, result) {
                      if (err) {
                        return res.status(500).send({ message: 'Error in registration', error: err.message });
                      }
                      return res.status(201).send({ message: 'Teacher created successfully'});
                    }
                  );
                }
                if (newrole == 3) {
                  return res.status(201).send({ message: 'Manager registered successfully'});
                }
                // res.status(201).send({ message: 'User created successfully', user_role: result.insertId});
              }
            );
            // res.status(201).send({ message: 'User created successfully', userId: result.insertId });
          }
        );
      });
    });
  }
);

router.post('/student',
  [
    body('username', 'Username is required').notEmpty(),
    body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    body('firstname', 'First name is required').notEmpty(),
    body('lastname', 'Last name is required').notEmpty(),
    body('email', 'Valid email is required').isEmail(),
    body('DOB', 'Date of Birth is required').notEmpty(),
    body('address', 'Address is required').notEmpty(),
    body('class_id', 'Class is required').notEmpty(),
    body('role', 'Role must be student').equals('student'),
    body('student_number', 'student_number must have numbers').isNumeric(),

  ], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, firstname, lastname, email, DOB, address, role, student_number, class_id } = req.body;

    var newrole = null;
    if (role === 'student') {
      newrole = 1;
    }


    // Hash the password
    bcrypt.hash(password, 10, function (err, hashedPassword) {
      if (err) {
        return res.status(500).send({ message: 'Error in password encryption', error: err.message });
      }

      // Check if username already exists
      db.query('SELECT * FROM users WHERE username = ?', [username], function (err, users) {
        if (err) {
          return res.status(500).send({ message: 'Database query error', error: err.message });
        }

        if (users.length > 0) {
          return res.status(400).send({ message: 'Username is already taken' });
        }

        // Insert user data into the database
        db.query('INSERT INTO users (username, password, firstname, lastname, email, DOB, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [username, hashedPassword, firstname, lastname, email, DOB, address], function (err, resultuser) {
            if (err) {
              return res.status(500).send({ message: 'Error in registration', error: err.message });
            }
            db.query('INSERT INTO userrole (user_id, role_id) VALUES (?, ?)',
              [resultuser.insertId, newrole], function (err, resultrole) {
                if (err) {
                  return res.status(500).send({ message: 'Error in registration', error: err.message });
                }

                db.query('INSERT INTO studenten (user_role, student_number, class_id) VALUES (?, ?, ?)',
                    [resultrole.insertId, student_number, class_id], function (err, result) {
                      if (err) {
                        return res.status(500).send({ message: 'Error in registration', error: err.message });
                      }
                      return res.status(201).send({ message: 'student created successfully'});
                    }
                  );
                // res.status(201).send({ message: 'it works' });

                // res.status(201).send({ message: 'User created successfully', user_role: result.insertId});
              }
            );
            // res.status(201).send({ message: 'User created successfully', userId: result.insertId });
          }
        );
      });
    });
  }
);




module.exports = router;
