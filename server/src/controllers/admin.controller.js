import Admin from "../models/admin.model.js";
import { SuccessResponse } from "../models/response.model.js";

export const createAdmin = async (req, res, next) => {
    const data = req.body;
    const admin = new Admin(data);

    try {
        if(!admin) throw new Error('Unable to signup');

        await admin.save();

        res.status(201).send(new SuccessResponse(201, 'Created', "Admin was created successfully", {admin}));

    } catch (error) {
        error.status = 400;
        error.statusText = 'Bad request';
        error.message = '';
        next(error);
    }
};

export const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        if(!email || !password) throw new Error('Unable to login');

        const admin = await Admin.findAdminByEmailAndPassword(email, password);
        if(!admin) throw new Error('Unable to login');

        const token = await admin.generateAuthToken();
        if(!token) throw new Error('Unable to login');

        res.status(200).send(new SuccessResponse(200, 'Ok', "Login successfully", {admin, token}));
        
    } catch (error) {
        error.status = 400;
        error.statusText = 'Bad request';
        error.message = '';
        next(error);
    }
};

export const logout = async (req, res, next) => {
    const admin = req.admin;
    const token =req.token;

    try {
        if(!admin || !token) throw new Error();
        admin.tokens = admin.tokens.filter((tokenDoc) => tokenDoc !== token);
        await admin.save();

        res.status(200).send(new SuccessResponse(200, 'Ok', "Logout successfully", {}));

    } catch (error) {
        error.status = 500;
        error.statusText = 'Internal Server Error';
        error.message = '';
        next(error);
    }
};