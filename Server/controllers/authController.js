import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    try {
       
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const user = await User.create({ name, email, password });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
