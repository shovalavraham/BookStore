import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";
import { SuccessResponse } from '../models/response.model.js';

export const createUser = async (req, res, next) => {
    const data = req.body;
    const user = new User(data);
    const cart = new Cart({
        ownerID: user._id,
    });

    try {
        const token = await user.generateAuthToken();
        await user.save();
        await cart.save();
        
        res.status(201).send(new SuccessResponse(200, 'Created', "User was created successfully", {user, token}));

    } catch (error) {
        error.status = 400;
        error.statusText = 'Bad request'
        error.message = '';
        next(error);
    }
};

export const login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        if(!email || !password) throw new Error('Unable to loign');

        const user = await User.findUserByEmailAndPassword(email, password);
        const token = await user.generateAuthToken();

        res.status(200).send(new SuccessResponse(200, 'Ok', "Login successfully", {user, token}));

    } catch (error) {
        error.status = 400;
        error.statusText = 'Bad request';
        next(error);
    }
};

export const logout = async (req, res, next) => {
    const {user, token} = req;

    try {
        user.tokens = user.tokens.filter((tokenDoc) => tokenDoc.token !== token);

        await user.save();

        res.status(200).send(new SuccessResponse(200, 'Ok', "Logout successfully", {}));

    } catch (error) {
        error.status = 500;
        error.statusText = 'Internal Server Error';
        error.message = '';
        next(error);
    }
};