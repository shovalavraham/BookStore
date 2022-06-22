import enviroments from "../../config/enviroments.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    try {
        const authorization = req.header('Authorization');
        if (!authorization) throw new Error();

        const token = authorization.replace('Bearer ', '');
        if (!token) throw new Error();

        const data = jwt.verify(token, enviroments.TOKEN_SECRET);
        if (!data) throw new Error();

        const user = await User.findOne({_id: data._id, 'tokens.token': token});
        if (!user) throw new Error();

        req.user = user;
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

export default userAuth;