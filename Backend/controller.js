// const { MongoClient } = require('mongodb');  // to establish connection to MongoDB
// const bcrypt = require('bcrypt');

// const home = async(req,res)=>{
//     res.send("welcome");
// }

// // const signUp = async(req,res)=>{
// //     res.send("sign up page");
// // }

// // const signUp = async(req,res)=>{
// //     res.json(req.body);
// // }

// const signUp = async (req,res)=>{
//     try{
//         const client = await MongoClient.connect('mongodb://localhost:27017/');
//         const coll = client.db('MyEvent').collection('signup');
//         const data = req.body;
//         data.password = await bcrypt.hash(data.password,5)  //  to encrypt the data  
//         await coll.insertOne(data);  //  to insert the encrypt password in mongodb

//         // await coll.insertOne(req.body);     ////     for enter the orinal data(password) in mongoDB
//         client.close();
//         res.send("signUp ok")
//     } catch (error) {
//         res.send("signUp error");
//     }
// }


// const addevent = async (req,res)=>{
//     try{
//         const client = await MongoClient.connect('mongodb://localhost:27017/');
//         const coll = client.db('MyEvent').collection('eventtable');
//         const data = req.body;
//         // data.password = await bcrypt.hash(data.password,5)  //  to encrypt the data  
//         await coll.insertOne(data);  //  to insert the encrypt password in mongodb

//         // await coll.insertOne(req.body);     ////     for enter the orinal data(password) in mongoDB
//         client.close();
//         res.send("signUp ok")
//     } catch (error) {
//         res.send("signUp error"); 
//     }
// }



// const searchName = async (req,res)=>{
//     const client = await MongoClient.connect('mongodb://localhost:27017/');
//         const coll = client.db('MyEvent').collection('eventtable');
//         const result = coll.find({eventname:req.body.eventname});
//         data = await result.toArray();
//         console.log(data)
//         client.close();


//     res.json(data);
// }


// // const searchDate = async (req, res) => {
// //     const client = await MongoClient.connect('mongodb://localhost:27017/');
// //     const coll = client.db('MyEvent').collection('eventtable');
    
// //     // Convert the string date from req.body.startdate to a JavaScript Date object
// //     const startDate = new Date(req.body.startdate);
    
// //     const result = coll.find({ startdate: { $eq: startDate } });
    
// //     data = await result.toArray();
// //     console.log(data);
    
// //     res.json(data);
// // }


// module.exports = {home,signUp,addevent,searchName};  // epxort to route



//////////////////////////////////////////////////////////////////////////////////////////////////////////


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

// Function to add a student
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

// Function to get all students
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

// New function to fetch all student records                        
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

module.exports = { home, signUp, addStudent, getStudents, getAllStudentRecords };



///////////////////////////////////////////////////////////
















