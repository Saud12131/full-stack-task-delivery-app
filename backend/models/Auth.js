import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
        trim: true,
        maxlength: [50, 'Username cannot be more than 50 characters']
    },
   password:{
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [3, 'Password cannot be less than 3 characters']
    },
});

// Method to compare entered password with hashed password
UserSchema.methods.matchpassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash the password before saving
UserSchema.pre('save', async function (next) {
    // Check if the password is modified
    if (!this.isModified('password')) { // Fixed: check if 'password' is modified
        return next(); // Return next if password is not modified
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Call next after hashing
});

const User = mongoose.model('User', UserSchema);
export default User;