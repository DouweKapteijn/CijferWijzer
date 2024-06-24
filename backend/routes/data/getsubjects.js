var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../../database');

// GET request for Cijfer student
router.get('/subjects', function (req, res, next) {

    // Assuming `user.userrole_id` is the correct property that contains the UserRole ID
    db.query(`
        SELECT * FROM subjects
        `
        , function (err, results) {
            if (err) {
                return res.status(500).send({ message: 'Database query error', error: err.message });
            }
            // Send the results back to the client
            return res.status(200).send({ data: results });
        });
});





module.exports = router;
