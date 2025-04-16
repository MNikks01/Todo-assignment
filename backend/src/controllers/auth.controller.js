// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');

// const signToken = id => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN
//     });
// };

// exports.register = catchAsync(async (req, res, next) => {
//     const newUser = await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     });

//     const token = signToken(newUser._id);

//     res.status(201).json({
//         status: 'success',
//         token,
//         data: {
//             user: newUser
//         }
//     });
// });

// exports.login = catchAsync(async (req, res, next) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return next(new AppError('Please provide email and password!', 400));
//     }

//     const user = await User.findOne({ email }).select('+password');

//     if (!user || !(await user.correctPassword(password, user.password))) {
//         return next(new AppError('Incorrect email or password', 401));
//     }

//     const token = signToken(user._id);

//     res.status(200).json({
//         status: 'success',
//         token,
//         data: {
//             user
//         }
//     });
// });

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from '../utils/appError.js';
import { generateToken } from '../utils/jwt.js';
import bcrypt from 'bcryptjs';

const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({
            success: false,
            message: 'Please provide name, email and password'
        })

    if (password.length < 8)
        return res.status(400).json({
            success: false,
            message: 'Password should be greater than 8 characters'
        })

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            hashedPassword: hashedPassword
        });
        if (!newUser)
            return res.status(400).json({
                success: false,
                message: 'Failed to register user'
            })

        const token = generateToken(newUser._id);

        res.status(201)
            .cookie('token', token, { httpOnly: true })
            .json({
                success: true,
                user: newUser,
                token,
                message: 'User registered successfully'
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to register user'
        })
    }
};

const login = async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    try {
        const user = await User.findOne({ email }).select('+password +hashedPassword');

        if (!user || !(await user.comparePassword(password, user.hashedPassword))) {
            return next(new AppError('Incorrect email or password', 401));
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        if (!token) {
            return next(new AppError('Failed to generate token', 400));
        }

        res.status(200)
            .cookie('token', token, { httpOnly: true })
            .json({
                success: true,
                token,
                user
            });
    } catch (error) {
        return next(new AppError(error, 400));
    }
};

const logout = async (req, res) => {
    console.log('api logout controller hit');

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    });
};

export { register, login, logout };
