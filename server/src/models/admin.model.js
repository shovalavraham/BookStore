import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js';
import jwt from 'jsonwebtoken';
import enviroments from '../../config/enviroments.js';
import bcrypt, { hash } from 'bcrypt';

const adminSchema = new mongoose.Schema({
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
});

adminSchema.methods.generateAuthToken = async function() {
    const admin = this;

    const token = jwt.sign({ _id: admin._id }, enviroments.TOKEN_SECRET);

    admin.tokens.push({token: token});
    await admin.save();

    return token;
};

adminSchema.pre('save', async function(next) {
    const admin = this;

    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8);
    }

    next();
});

adminSchema.statics.findAdminByEmailAndPassword = async (email, password) => {
    const admin = await Admin.findOne({email});
    if(!admin) throw new Error('Unable to login');

    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if(!isPasswordMatch) throw new Error('Unable to login');

    return admin;
};

adminSchema.methods.toJSON = function () {
    const admin = this;

    const adminObject = admin.toObject();
    delete adminObject.password;
    delete adminObject.tokens;
    delete adminObject.__v;

    return adminObject;
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;