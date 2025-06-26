const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../model/Admin');
// const Admin = require('../models/Admin'); // Adjust the path as necessary

// MongoDB connection URI
const dbURI = 'mongodb+srv://Arapp:4NXUcv37A1NyJ7Y9@cluster0.iymtagb.mongodb.net/ecommerce-shofy?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Connected to MongoDB');

    // // Check if an admin user already exists
    // const existingAdmin = await Admin.findOne({ role: 'Admin' });
    // if (existingAdmin) {
    //   console.log('Admin user already exists!');
    //   mongoose.connection.close();
    //   return;
    // }

    // Create new admin user
    const admin = new Admin({
      name: 'Ghalib', // You can change this to a more descriptive name
      email: 'ghalib6700@gmail.com', // Replace with a valid email
      role: 'Admin',
      status: 'Active',
      password: bcrypt.hashSync('Ghalibadmin6700', 10), // Default password, hashed
      joiningDate: new Date(),
    });

    // Save the admin user to the database
    await admin.save();
    console.log('Admin user created successfully');

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    mongoose.connection.close();
  });
