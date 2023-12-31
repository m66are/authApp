import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
  },{collection : "users"});
  
const userModel = mongoose.model("user", userSchema);
export default userModel;
