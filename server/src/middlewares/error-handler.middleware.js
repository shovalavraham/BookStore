const errorHandler = (err, req, res, next) => {
    
    res.status(err.status).send({
        status: err.status,
        statusText: err.statusText,
        message: err.message,
    });
};

export default errorHandler;