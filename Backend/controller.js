const { MongoClient } = require('mongodb'); // to establish connection to MongoDB
const bcrypt = require('bcrypt');

const home = async (req, res) => {
    res.send("welcome");
};

const signUp = async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017/');
        const coll = client.db('MyProjects').collection('users');
        const data = req.body;
        data.password = await bcrypt.hash(data.password, 5); // to encrypt the data
        await coll.insertOne(data); // to insert the encrypted password in MongoDB

        client.close();
        res.status(201).json({ message: 'User created successfully' }); // Send JSON response
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' }); // Send JSON response
    }
};

const addStudent = async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017/');
        const coll = client.db('MyProjects').collection('records');
        const data = req.body;
        const date = new Date().toLocaleDateString(); // Get the current date
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

        // Build the query object based on provided filters
        let query = {};
        if (name) query.name = new RegExp(name, 'i'); // Case-insensitive search for name
        if (date) query.date = date;
        
        // if (date){
        // // Convert the date string from mm-dd-yyyy to yyyy-mm-dd format
        // const [month, day, year] = date.split('-');
        // const formattedDate = `${day}-${month}-${year}`; // Convert to yyyy-mm-dd format
        // query.date = formattedDate;
        // }

        if (rollNo) query.rollNo = rollNo;
        if (department) query.branch = new RegExp(department, 'i'); // Case-insensitive search for department

        const students = await coll.find(query).toArray();

        client.close();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};


module.exports = { home, signUp, addStudent, getStudents, getAllStudentRecords,searchStudents };
