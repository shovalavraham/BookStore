import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";

export const createUser = async (req, res) => {
    const data = req.body;
    const user = new User(data);
    const cart = new Cart({
        ownerID: user._id,
    });

    try {
        const token = await user.generateAuthToken();
        await user.save();
        await cart.save();
        
        res.status(201).send({
            status: 201,
            statusText: 'Created',
            data: {
                user: user,
                token: token,
            },
            message: "User was created successfully",
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
        if(!email || !password) throw new Error('Unable to loign');

        const user = await User.findUserByEmailAndPassword(email, password);
        const token = await user.generateAuthToken();

        res.status(200).send({
            status: 200,
            statusText: 'Ok',
            data: {
                user: user,
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
    const user = req.user;
    const token = req.token;

    try {
        user.tokens = user.tokens.filter((tokenDoc) => tokenDoc.token !== token);

        await user.save();

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