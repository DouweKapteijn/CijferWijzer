var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../../database');

// GET request for Cijfer student
router.get('/class/:class', function (req, res, next) {

    const classParams = req.params.class;

    console.log(classParams);

    // Assuming `user.userrole_id` is the correct property that contains the UserRole ID
    db.query(`
        SELECT *, studenten.id FROM class 
        JOIN studenten ON class.id = studenten.class_id
        JOIN userrole ON studenten.user_role = userrole.id
        JOIN users ON userrole.user_id = users.id
        WHERE class = ?;
        `
        , [classParams], function (err, results) {
            if (err) {
                return res.status(500).send({ message: 'Database query error', error: err.message });
            }
            // Send the results back to the client
            return res.status(200).send({ data: results });
        });
});





module.exports = router;
