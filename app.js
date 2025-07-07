import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';

const app = express();

// Use here is prepended to the path of the routes
// So sign-up will be available at /api/v1/auth/sign-up
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, 'localhost', async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectToDatabase();
});

export default app;