import User from '../models/Auth.js';
import jwt, { decode } from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { userSchema } from '../validations/UserValidations.js'
const Signup = async (req, res) => {
    const { username, password } = userSchema.parse(req.body);
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Please enter all required fields." });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }
        const user = await User.create({ username, password });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        if (user) {
            return res.status(201).json({ success: true, message: "User added successfully", token });
        } else {
            throw new Error("Unable to register user");
        }
    } catch (err) {
        console.error(err.stack);
        return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

const Login = async (req, res) => {
    const { username, password } = userSchema.parse(req.body);
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Please enter all required fields." });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        if (token) {
            return res.status(200).json({ success: true, message: "User logged in successfully", token });
        } else {
            throw new Error("Unable to login user");
        }
    } catch (err) {
        console.error(err.stack);
        return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

export { Signup, Login };