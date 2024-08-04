// const express = require('express')
// const app = express()
// const port = 3000
// app.use(express.json());  // to handle ar Print json file

// app.use('/',route);

// app.listen(port, () => {
  //   console.log(`Example app listening on port ${port}`)
  // })
  
  // // index.js
  
  // // Import required modules
  // const express = require('express');
  // const mongoose = require('mongoose');
  // const bodyParser = require('body-parser');
  // const cors = require('cors');
  
  // // Initialize Express app
  // const app = express();
  // const PORT = 3000; // Port number
  
  // // Middleware
  // app.use(bodyParser.json()); // Parse JSON data
  // app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
  // app.use(cors()); // Enable CORS to allow requests from your frontend
  
  // // Connect to MongoDB
  // mongoose.connect('mongodb://localhost:27017/MyEvent', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Define the User model
// const userSchema = new mongoose.Schema({
  //   username: { type: String, required: true },
  //   password: { type: String, required: true },
  // });
  // const User = mongoose.model('User', userSchema);
  
  
  // // Define a route to handle signup requests
  // app.post('/signup', async (req, res) => {
    //   const { username, password } = req.body; // Extract data from request body

//   try {
  //     const newUser = new User({ username, password }); // Create new user instance
  //     await newUser.save(); // Save user to MongoDB
  //     res.status(201).json({ message: 'User created successfully!' }); // Send success response
  //   } catch (error) {
    //     res.status(400).json({ error: 'Error creating user' }); // Send error response
    //   }
    // });
    
    // // Start the server
    // app.listen(PORT, () => {
      //   console.log(`Server running on http://localhost:${PORT}`);
      // });
      
      
      
      
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      
    
      
////////////////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords
const route = require('./route');

// Initialize Express app
const app = express();
const PORT = 3000; // Port number

// Middleware
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors()); // Enable CORS to allow requests from your frontend

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MyProjects', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define the User model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Define a route to handle signup requests
app.post('/signup', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body; // Extract data from request body

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' }); // Send error response
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' }); // Send error response
        }

        // Hash the password before saving to database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword }); // Create new user instance
        await newUser.save(); // Save user to MongoDB
        res.status(201).json({ message: 'User created successfully!' }); // Send success response
    } catch (error) {
        res.status(400).json({ error: 'Error creating user' }); // Send error response
    }
});

// Use the route module
app.use('/api', route);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




////////////////////////////////////////////////////////////////////////////////////////////


