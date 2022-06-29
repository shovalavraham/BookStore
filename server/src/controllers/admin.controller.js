import Admin from "../models/admin.model.js";

export const createAdmin = async (req, res, next) => {
    const data = req.body;
    const admin = new Admin(data);

    try {
        await admin.save();

        res.status(201).send({
            status: 201,
            statusText: 'Created',
            data: {
                admin: admin,
            },
            message: "Admin was created successfully",
        });
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
        const token = await admin.generateAuthToken();

        res.status(200).send({
            status: 200,
            statusText: 'Ok',
            data: {
                admin: admin,
                token: token,
            },
            message: "Login successfully",
        });
        
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
        admin.tokens = admin.tokens.filter((tokenDoc) => tokenDoc !== token);
        await admin.save();

        res.status(200).send({
            status: 200,
            statusText: 'Ok',
            data: {},
            message: "Logout successfully",
        });

    } catch (error) {
        error.status = 500;
        error.statusText = 'Internal Server Error';
        error.message = '';
        next(error);
    }
};