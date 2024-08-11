// const { MongoClient } = require('mongodb'); // to establish connection to MongoDB
// const bcrypt = require('bcrypt');

// const home = async (req, res) => {
//     res.send("welcome");
// };

// const signUp = async (req, res) => {
//     try {
//         const client = await MongoClient.connect('mongodb://localhost:27017/');
//         const coll = client.db('MyProjects').collection('users');
//         const data = req.body;
//         data.password = await bcrypt.hash(data.password, 5); // to encrypt the data
//         await coll.insertOne(data); // to insert the encrypted password in MongoDB

//         client.close();
//         res.status(201).json({ message: 'User created successfully' }); // Send JSON response
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create user' }); // Send JSON response
//     }
// };

// const addStudent = async (req, res) => {
//     try {
//         const client = await MongoClient.connect('mongodb://localhost:27017/');
//         const coll = client.db('MyProjects').collection('records');
//         const data = req.body;
//         const date = new Date().toLocaleDateString(); // Get the current date
//         const newStudent = { ...data, date };

//         await coll.insertOne(newStudent);
//         client.close();
//         res.status(201).json({ message: 'Student added successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to add student' });
//     }
// };

// const getStudents = async (req, res) => {
//     try {
//         const client = await MongoClient.connect('mongodb://localhost:27017/');
//         const coll = client.db('MyProjects').collection('records');
//         const students = await coll.find().toArray();

//         client.close();
//         res.status(200).json(students);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch students' });
//     }
// };

// const getAllStudentRecords = async (req, res) => {
//     try {
//         const client = await MongoClient.connect('mongodb://localhost:27017/');
//         const coll = client.db('MyProjects').collection('records');
//         const students = await coll.find().toArray();

//         client.close();
//         res.status(200).json(students);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch student records' });
//     }
// };


// const searchStudents = async (req, res) => {
//     try {
//         const client = await MongoClient.connect('mongodb://localhost:27017/');
//         const coll = client.db('MyProjects').collection('records');
//         const { name, date, rollNo, department } = req.query;

//         // Build the query object based on provided filters
//         let query = {};
//         if (name) query.name = new RegExp(name, 'i'); // Case-insensitive search for name
//         if (date) query.date = date;
        
//         // if (date){
//         // // Convert the date string from mm-dd-yyyy to yyyy-mm-dd format
//         // const [month, day, year] = date.split('-');
//         // const formattedDate = `${day}-${month}-${year}`; // Convert to yyyy-mm-dd format
//         // query.date = formattedDate;
//         // }

//         if (rollNo) query.rollNo = rollNo;
//         if (department) query.branch = new RegExp(department, 'i'); // Case-insensitive search for department

//         const students = await coll.find(query).toArray();

//         client.close();
//         res.status(200).json(students);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch students' });
//     }
// };


// module.exports = { home, signUp, addStudent, getStudents, getAllStudentRecords,searchStudents };







/////////////////////////////////////////////////////////////////////////////////////



const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const home = async (req, res) => {
    res.send("Welcome");
};

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        const client = await MongoClient.connect('mongodb://localhost:27017/');
        const coll = client.db('MyProjects').collection('users');

        const existingUser = await coll.findOne({ email });
        if (existingUser) {
            client.close();
            return res.status(400).json({ error: 'User already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const signUp = async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017/');
        const coll = client.db('MyProjects').collection('users');
        const data = req.body;
        data.password = await bcrypt.hash(data.password, 5);
        await coll.insertOne(data);

        // const token = jwt.sign({ email: data.email }, JWT_SECRET, { expiresIn: '1h' });


        client.close();
        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const client = await MongoClient.connect('mongodb://localhost:27017/');
        const coll = client.db('MyProjects').collection('users');
        const user = await coll.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        client.close();
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
};

// // SignIn function (alternate)
// exports.signin = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ error: 'Invalid email or password' });
//         }

//         // Check if the password is correct
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid email or password' });
//         }

//         // Generate a JWT token
//         const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// Token verification middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

    jwt.verify(tokenWithoutBearer, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }
        req.userEmail = decoded.email;
        next();
    });
};

const addStudent = async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017/');
        const coll = client.db('MyProjects').collection('records');
        const data = req.body;
        const date = new Date().toLocaleDateString(); 
        const newStudent = { ...data, date };

        await coll.insertOne(newStudent);
        client.close();
        res.status(201).json({ message: 'Student added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add student' });
    }
};

const getStudents = async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017/');
        const coll = client.db('MyProjects').collection('records');
        const students = await coll.find().toArray();

        client.close();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};

const getAllStudentRecords = async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017/');
        const coll = client.db('MyProjects').collection('records');
        const students = await coll.find().toArray();

        client.close();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch student records' });
    }
};

const searchStudents = async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017/');
        const coll = client.db('MyProjects').collection('records');
        const { name, date, rollNo, department } = req.query;

        let query = {};
        if (name) query.name = new RegExp(name, 'i'); 
        if (date) query.date = date;
        if (rollNo) query.rollNo = rollNo;
        if (department) query.branch = new RegExp(department, 'i'); 
        const students = await coll.find(query).toArray();

        client.close();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};

module.exports = { home, signUp, signIn, addStudent, getStudents, getAllStudentRecords, searchStudents, verifyToken };
