
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

        const token = jwt.sign({ email: data.email }, JWT_SECRET, { expiresIn: '1h' });


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
        
        res.status(200).json({
            message: 'Login successful',
            token: token,
            username: user.username // Assuming 'username' field exists in your user document
        });

    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
};


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
        // if (rollNo) query.rollNo = rollNo;
        if (rollNo) query.rollNo = new RegExp(`^${rollNo}$`, 'i'); 
        if (department) query.branch = new RegExp(department, 'i'); 
        const students = await coll.find(query).toArray();

        client.close();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};

////////////////////////////////////////////////////////








//////////////////////////////////////////////////////

// let dbClient;

// async function initializeDbConnection() {
//     if (!dbClient) {
//         dbClient = await MongoClient.connect('mongodb://localhost:27017/');
//     }
//     return dbClient.db('MyProjects').collection('records');
// }

// const searchStudents = async (req, res) => {
//     try {
//         const coll = await initializeDbConnection();
//         const { name, date, rollNo, department } = req.query;

//         let query = {};
//         if (name) query.name = new RegExp(name, 'i');
//         if (date) query.date = date;
//         if (rollNo) query.rollNo = rollNo;
//         if (department) query.branch = new RegExp(department, 'i');

//         const students = await coll.find(query).toArray();
//         res.status(200).json(students);
//     } catch (error) {
//         console.error('Error fetching students:', error);
//         res.status(500).json({ error: 'Failed to fetch students' });
//     }
// };


const getStudentByRollNo = async (req, res) => {
    try {
        const { rollno } = req.params;

        // Establish database connection
        const client = await MongoClient.connect('mongodb://localhost:27017/');
        const coll = client.db('MyProjects').collection('records');

  // Query for the student using a case-insensitive regex
  const students = await coll
  .find({ rollNo: { $regex: new RegExp(`^${rollno}$`, 'i') } })
  .toArray(); // Fetch all matching records
client.close()

        if (!students || students.length === 0) {
            return res.status(404).json({ message: 'No records found for this roll number' });
        }

        // Return the array of students
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students by roll number:', error);
        res.status(500).json({ message: 'Error fetching student records', error });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { rollNo } = req.params;  // Get the rollNo from URL parameters

        // Establish database connection
        const client = await MongoClient.connect('mongodb://localhost:27017/');
        const coll = client.db('MyProjects').collection('records');

        // Perform the deletion based on rollNo
        const result = await coll.deleteOne({ rollNo });

        client.close();

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student record deleted successfully' });
    } catch (error) {
        console.error('Error deleting student record:', error);
        res.status(500).json({ error: 'Failed to delete student' });
    }
};



module.exports = { home, signUp, signIn, addStudent, getStudents, getAllStudentRecords, searchStudents,getStudentByRollNo, deleteStudent, verifyToken };
