import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import enviroments from '../config/enviroments.js';
import connectToMongoDB from './databases/mongoose.db.js';
import bookRouter from './routers/book.router.js';
import userRouter from './routers/user.router.js';
import cartRouter from './routers/cart.router.js';
import adminRouter from './routers/admin.router.js';
import errorHandler from './middlewares/error-handler.middleware.js';

dotenv.config();

const PORT = enviroments.PORT;  

const app = express();

app.use(express.json());
app.use(cors());

// Routers
app.use(bookRouter);
app.use(userRouter);
app.use(cartRouter);
app.use(adminRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server is running on port: ${PORT}`);

    await connectToMongoDB();
});