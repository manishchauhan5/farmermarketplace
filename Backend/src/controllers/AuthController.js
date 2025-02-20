import { User } from '../models/UserModel.js';  
import { comparePassword, hashPassword } from '../helpers/AuthHelper.js';
import jwt from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await hashPassword(password);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();  
      res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
};


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY , { expiresIn: '30d' });

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
