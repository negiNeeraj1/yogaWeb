import { Subscription } from "../models/Yoga.model.js";

export const createSubscription = async (req, res) => {
    try {
        const { userId, type, endDate, totalClasses, price, renewal } = req.body;

        if (price < 0) {
            return res.status(400).json({
                success: false,
                message: 'Price must be a positive number.'
            });
        }

        const subscription = new Subscription({
            user: userId,
            type,
            endDate,
            totalClasses,
            remainingClasses: totalClasses,
            price: price,        
            renewal: renewal     
        });

        const savedSubscription = await subscription.save();
        res.status(201).json({ success: true, data: savedSubscription });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getUserSubscriptions = async (req, res) => {
    try {
        const { userId } = req.params;
        const subscriptions = await Subscription.find({
            user: userId,
            status: 'active',
            endDate: { $gt: new Date() }
        });
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const updateSubscription = async (req, res) => {
    try {
        const { subscriptionId } = req.params;
        const updatedSubscription = await Subscription.findByIdAndUpdate(
            subscriptionId,
            req.body,
            { new: true }
        );
        if (!updatedSubscription) {
            return res
                .status(404)
                .json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, data: updatedSubscription });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};