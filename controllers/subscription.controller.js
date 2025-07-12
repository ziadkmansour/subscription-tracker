import Subscription from '../models/subscription.model.js';

export const createSubscription = async(req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            userId: req.user._id,
        })
        res.status(201).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async(req, res, next) => {
    try {
        // Check if user is the same as the one in the request
        if (!req.user._id.equals(req.params.userId)) {
            const error = new Error('You are not authorized to view these subscriptions');
            error.status = 403;
            throw error;
        }
        const subscriptions = await Subscription.find({ user: req.params.userId });
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
}