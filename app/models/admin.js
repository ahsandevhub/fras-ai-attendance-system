import mongoose from "mongoose";

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
});

// Check if the model already exists to prevent redefinition
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
