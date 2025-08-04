// User Schema with password hashing//
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: {
    type: String,
    minlength: 5,
    required: true
    }
  });
// hash user password before saving//
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});
// this is a method to see if the password is correct for the login//
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs"; // <-- use bcryptjs for simplicity

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Please enter your name"],
//     },
//     email: {
//       type: String,
//       required: [true, "Please enter your email"],
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: [true, "Please enter a password"],
//       minlength: 6,
//     },
//   },
//   { timestamps: true }
// );

// // 🔐 Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (this.password && (this.isNew || this.isModified("password"))) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// // 🔐 Compare password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model("User", userSchema);
// export default User;


// // models/User.js
// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// // User Schema
// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Please enter your name"],
//     },
//     email: {
//       type: String,
//       required: [true, "Please enter your email"],
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: [true, "Please enter a password"],
//       minlength: 6,
//     },
//   },
//   { timestamps: true }
// );

// // Hash password before saving
// // userSchema.pre("save", async function (next) {
// //   if (!this.isModified("password")) return next();
// //   const salt = await bcrypt.genSalt(10);
// //   this.password = await bcrypt.hash(this.password, salt);
// //   next();
// // });

// // // Method to compare passwords
// // userSchema.methods.matchPassword = async function (enteredPassword) {
// //   // return await bcrypt.compare(enteredPassword, this.password);
// //   return this.password? bcrypt.compare(enteredPassword, this.pz): false;
// // };
// // hash user password

// userSchema.pre("save", async function (next) {

//   if (this.password &&(this.isNew || this.isModified("password"))) {

//     const saltRounds = 10;

//     this.password = await bcrypt.hash(this.password, saltRounds);

//   }

//   next();

// });

// // custom method to compare and validate password for logging in

// userSchema.methods.isCorrectPassword = async function (password) {

//   return this.password? bcrypt.compare(password, this.password): false;

// };







// const User = mongoose.model("User", userSchema);
// export default User;
