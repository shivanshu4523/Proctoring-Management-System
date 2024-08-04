// const express = require('express')
// const {home,signUp,addevent,searchName} = require('./controller')  // import from controller

// const router = express.Router();
// //ALL route

// router.route('/').get(home);
// // router.route('/signin').get(signIn);
// router.route('/signup').post(signUp);
// router.route('/addevent').post(addevent);
// // router.route('/searchdate').get(searchDate);
// router.route('/searchname').get(searchName);


// module.exports = router;


////////////////////////////////////////////////////////////////////////////////////////////////////





const express = require('express');
const router = express.Router();
const { home, signUp, addStudent, getStudents , getAllStudentRecords } = require('./controller');

router.get('/', home);
router.post('/signup', signUp);
// router.post('/addevent', addevent);
// router.post('/searchName', searchName);
router.post('/students', addStudent);
router.get('/students', getStudents);
router.get('/students', getAllStudentRecords);


module.exports = router;


////////////////////////////////////////////////////////////////////////

