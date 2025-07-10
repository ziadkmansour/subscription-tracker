const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;
        // Log to console for debugging
        console.error(err);
        // Mongoose bad ObjectId error
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new Error(message);
            error.statusCode = 404;
        }
        // Mongoose duplicate key error
        if (err.code === 11000) {
            const message = `Duplicate field value entered: ${err.keyValue.name}`;
            error = new Error(message);
            error.statusCode = 400;
        }
        // Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message).join(', ');
            error = new Error(message);
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error'
        });
    } catch (error) {
        next(error);
    }
}

export default errorMiddleware;