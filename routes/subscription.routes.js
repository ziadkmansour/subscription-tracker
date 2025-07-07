import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({ title: 'GET all subscriptions' });
});

subscriptionRouter.get('/:id', (req, res) => {
    res.send({ title: 'GET subscription by ID', id: req.params.id });
});

subscriptionRouter.post('/', (req, res) => {
    res.send({ title: 'CREATE a new subscription' });
});

subscriptionRouter.put('/:id', (req, res) => {
    res.send({ title: 'UPDATE subscription by ID', id: req.params.id });
});

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({ title: 'DELETE subscription by ID', id: req.params.id });
});

subscriptionRouter.get('/user/:userId', (req, res) => {
    res.send({ title: 'GET subscriptions by user ID', userId: req.params.userId });
});

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({ title: 'CANCEL subscription by ID', id: req.params.id });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({ title: 'GET upcoming renewals' });
});

export default subscriptionRouter;