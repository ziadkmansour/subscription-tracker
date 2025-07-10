import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize  from "../middlwares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => {
    res.send({ title: 'CREATE user' });
});

userRouter.put('/:id', (req, res) => {
    res.send({ title: 'UPDATE user', id: req.params.id });
});

userRouter.delete('/:id', (req, res) => {
    res.send({ title: 'DELETE user', id: req.params.id });
});

export default userRouter;