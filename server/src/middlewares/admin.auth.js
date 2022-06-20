import enviroments from "../../config/enviroments.js";
import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) throw new Error();

        const data = jwt.verify(token, enviroments.TOKEN_SECRET);
        if (!data) throw new Error();

        const admin = await Admin.findOne({_id: data._id, 'tokens.token': token});
        if (!admin) throw new Error();

        req.admin = admin;
        req.token = token;    

        next();
    } catch (error) {
        
        res.status(401).send({
            status: 401,
            statusText: 'Unauthorized',
            message: ''
        });
    }
};

export default adminAuth;