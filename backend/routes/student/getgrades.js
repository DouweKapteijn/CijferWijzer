var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../../database');

// GET request for Cijfer student
router.get('/grades', function (req, res, next) {
    const user = req.user;
    console.log(user.userrole_id);

        // Assuming `user.userrole_id` is the correct property that contains the UserRole ID
        db.query(`
        SELECT cijfers.*, Subjects.subject
        FROM cijfers
        JOIN studenten ON studenten.id = cijfers.student_id
        JOIN UserRole ON UserRole.id = studenten.user_role
        JOIN Subjects ON Subjects.id = cijfers.subject_id
        WHERE UserRole.id = ?
        ORDER BY cijfers.id DESC;

        `, [user.userrole_id], function (err, results) {
            if (err) {
                return res.status(500).send({ message: 'Database query error', error: err.message });
            }
            // Send the results back to the client
            return res.status(200).send({ cijfers: results });
        });
    });





module.exports = router;
