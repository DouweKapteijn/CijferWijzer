var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../../database');

// GET request for Cijfer student
router.get('/getgrade', function (req, res, next) {
    // Get student_id from the request header
    const studentId = req.headers['student_id'];

    if (!studentId) {
        return res.status(400).send({ message: 'Student ID is required in the header' });
    }

    // Assuming `user.userrole_id` is the correct property that contains the UserRole ID
    db.query(`
    SELECT cijfers.*, Subjects.subject
    FROM cijfers
    JOIN studenten ON studenten.id = cijfers.student_id
    JOIN UserRole ON UserRole.id = studenten.user_role
    JOIN Subjects ON Subjects.id = cijfers.subject_id
    WHERE studenten.id = ?
    ORDER BY cijfers.id DESC;
    `, [studentId], function (err, results) {
        if (err) {
            return res.status(500).send({ message: 'Database query error', error: err.message });
        }
        // Send the results back to the client
        return res.status(200).send({ cijfers: results });
    });
});

router.get('/getstudentprofile', function (req, res, next) {
    // Get student_id from the request header
    const studentId = req.headers['student_id'];

    if (!studentId) {
        return res.status(400).send({ message: 'Student ID is required in the header' });
    }

    // Assuming `user.userrole_id` is the correct property that contains the UserRole ID
    db.query(`
    SELECT *
    FROM class
    JOIN studenten ON class.id = studenten.class_id
    JOIN userrole ON studenten.user_role = userrole.id
    JOIN users ON userrole.user_id = users.id
    WHERE studenten.id = ?;
    `, [studentId], function (err, results) {
        if (err) {
            return res.status(500).send({ message: 'Database query error', error: err.message });
        }
        // Send the results back to the client
        return res.status(200).send({ profile: results });
    });
});

router.post('/grade',
    [
        body('student_id').isNumeric().withMessage('REQUIRED, Student assigned is required and must be numeric'),
        body('subject_id').isNumeric().withMessage('REQUIRED, Subject assigned is required and must be numeric'),
        body('grade').isFloat().withMessage('REQUIRED, Grade must be a floating-point number'),
        body('weight').isNumeric().withMessage('REQUIRED, Weight is required and must be numeric'),
        body('period').isNumeric().withMessage('REQUIRED, Period is required and must be numeric'),
    ], function (req, res) {
        console.log(req.user.userrole_id);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { student_id, subject_id, grade, weight, period } = req.body;
        // Your SQL INSERT operation
        db.query(`
        SELECT docenten.id FROM userrole 
        JOIN docenten ON docenten.user_role = userrole.id
        WHERE userrole.id = ?`,
            [req.user.userrole_id], function (err, results) {
                if (err) {
                    return res.status(500).send({ message: 'Database query error', error: err.message });
                }

                db.query(`INSERT INTO cijfers (student_id, docent_id, subject_id, grade, weight, period) VALUES (?, ?, ?, ?, ?, ?);`,
                    [student_id, results[0].id, subject_id, grade, weight, period], function (err, results) {
                        if (err) {
                            return res.status(500).send({ message: 'Database query error', error: err.message });
                        }
                        return res.status(200).send({ success: { message: `Grade added for user student_id:${student_id}`, result: results } });
                    });

            });


    });

router.delete('/deletegrade', function (req, res, next) {
    // Get grade_id from the request header
    const grade_id = req.headers['grade_id'];

    if (!grade_id) {
        return res.status(400).send({ message: 'grade_id is required in the header' });
    }

    // Assuming `user.userrole_id` is the correct property that contains the UserRole ID
    db.query("DELETE FROM cijfers WHERE `cijfers`.`id` = ?", [grade_id], function (err, results) {
        if (err) {
            return res.status(500).send({ message: 'Database query error', error: err.message });
        }
        // Send the results back to the client
        return res.status(200).send({ success: "successfully Deleted Grade ID = " + grade_id });
    });
});



module.exports = router;