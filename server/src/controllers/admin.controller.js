import Admin from "../models/admin.model.js";

export const createAdmin = async (req, res) => {
    const data = req.body;
    const admin = new Admin(data);

    try {
        const token = await admin.generateAuthToken();
        await admin.save();

        res.status(201).send({
            status: 201,
            statusText: 'Created',
            data: {
                admin: admin,
                token: token,
            },
            message: "Admin was created successfully",
        });
    } catch (error) {
        res.status(400).send({
            status: 400,
            statusText: 'Bad request',
            message: "",
        })
    }
};

export const login = async (req, res) => {
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
        res.status(400).send({
            status: 400,
            statusText: 'Bad request',
            message: "",
        })
    }
};

export const logout = async (req, res) => {
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
        res.status(500).send({
            status: 500,
            statusText: 'Internal Server Error',
            message: '',
        });
    }
};