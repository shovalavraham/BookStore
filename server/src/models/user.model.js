import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js';
import jwt from 'jsonwebtoken';
import enviroments from '../../config/enviroments.js';
import bcrypt, { hash } from 'bcrypt';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minlength: 1,
        trim: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: 1,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, 'Email is already in use'],
        validate(value){
            if (!isEmail(value)) {
                throw new Error('Email is invalid');
            }
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        validate(value) {
            if (!isStrongPassword(value, {minSymbols: 0})) {
                throw new Error('Password must be at least 8 charachters, and must contain at least 1 Uppercase charachter, 1 Lowercase charachter and 1 Number');
            }
        },
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
}, {
    toJSON: {
        virtuals: true,
    }, 
    toObject: {
        virtuals: true,
    }
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;

    const token = jwt.sign({ _id: user._id }, enviroments.TOKEN_SECRET);

    user.tokens.push({token: token});
    await user.save();

    return token;
};

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

userSchema.statics.findUserByEmailAndPassword = async (email, password) => {
    const user = await User.findOne({email});
    if(!user) throw new Error('Unable to login');

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) throw new Error('Unable to login');

    return user;
};

userSchema.methods.toJSON = function () {
    const user = this;

    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.__v;

    return userObject;
};

userSchema.virtual('cart', {
    ref: 'Cart',
    localField: '_id',
    foreignField: 'ownerID',
})

const User = mongoose.model('User', userSchema);

export default User;