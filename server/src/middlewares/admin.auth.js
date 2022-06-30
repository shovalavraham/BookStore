import enviroments from "../../config/enviroments.js";
import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const authorization = req.header('Authorization');
        if (!authorization) throw new Error();

        const token = authorization.replace('Bearer ', '');
        if (!token) throw new Error();

        const data = jwt.verify(token, enviroments.TOKEN_SECRET);
        if (!data) throw new Error();

        const admin = await Admin.findOne({_id: data._id, 'tokens.token': token});
        if (!admin) throw new Error();

        req.admin = admin;
        req.token = token;    

        next();
    } catch (error) {
        error.status = 401;
        error.statusText = 'Unauthorized';
        error.message = '';
        next(error);
    }
};

export default adminAuth;