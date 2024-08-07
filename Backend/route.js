// const express = require('express');
// const router = express.Router();
// const { home, signUp, addStudent, getStudents , getAllStudentRecords, searchStudents } = require('./controller');

// router.get('/', home);
// router.post('/signup', signUp);
// router.post('/students', addStudent);
// router.get('/students', getStudents);
// router.get('/all-students', getAllStudentRecords);
// router.get('/students/search', searchStudents); // New route for searching


// module.exports = router;


////////////////////////////////////////////////////////////////////////



const express = require('express');
const router = express.Router();
const { home, signUp, signIn, addStudent, getStudents, getAllStudentRecords, searchStudents, verifyToken } = require('./controller');

router.get('/', home);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/students', verifyToken, addStudent);
router.get('/students', verifyToken, getStudents);
router.get('/all-students', verifyToken, getAllStudentRecords);
router.get('/students/search', verifyToken, searchStudents);

module.exports = router;
