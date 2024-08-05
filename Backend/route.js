const express = require('express');
const router = express.Router();
const { home, signUp, addStudent, getStudents , getAllStudentRecords } = require('./controller');

router.get('/', home);
router.post('/signup', signUp);
router.post('/students', addStudent);
router.get('/students', getStudents);
router.get('/all-students', getAllStudentRecords);


module.exports = router;


////////////////////////////////////////////////////////////////////////

