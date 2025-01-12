import { Plan, Subscription } from '../models/Plan.model.js';
import User from '../models/user.Model.js';
import SubscriptionPayment from '../models/subscription.payment.model.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
    key_id: 'rzp_test_zR3Hw3haQMWYC9', 
    key_secret: 'W50i31GU4hsAObmu6DaTpw1f'
});


export const subscriptionController = {

    createPlan: async (req, res) => {
        try {
            const { name, planId, monthlyPrice, yearlyPrice, duration, features, notIncludedFeatures, maxRecordedClasses, maxLiveClassesPerMonth } = req.body;

            const existingPlan = await Plan.findOne({ planId });

            if (existingPlan) {
                return res.status(400).json({
                    success: false,
                    message: 'Plan with this planId already exists.',
                });
            }

            const newPlan = new Plan({
                name,
                planId,
                monthlyPrice,
                yearlyPrice,
                duration,
                features,
                notIncludedFeatures,
                maxRecordedClasses,
                maxLiveClassesPerMonth,
                status: 'active',
            });

            await newPlan.save();

            res.status(201).json({
                success: true,
                data: newPlan,
                message: 'Plan created successfully.',
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    updatePlan: async (req, res) => {
        try {
            const { planId } = req.params;
            const updateData = req.body;

            const plan = await Plan.findOne({ planId });

            if (!plan) {
                return res.status(404).json({
                    success: false,
                    message: 'Plan not found.',
                });
            }

            Object.assign(plan, updateData);

            await plan.save();

            res.status(200).json({
                success: true,
                data: plan,
                message: 'Plan updated successfully.',
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    deletePlan: async (req, res) => {
        try {
            const { planId } = req.params;

            const plan = await Plan.findOne({ planId });

            if (!plan) {
                return res.status(404).json({
                    success: false,
                    message: 'Plan not found.',
                });
            }

            await plan.remove();

            res.status(200).json({
                success: true,
                message: 'Plan deleted successfully.',
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    
    getPlans: async (req, res) => {
        try {
            const plans = await Plan.find({ status: 'active' });
            res.status(200).json({ success: true, data: plans });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    payForSubscribe: async (req, res) => {
        try {
            const { userId, planId, isYearly, paymentDetails } = req.body;

            const user = await User.findById(userId);
            const plan = await Plan.findOne({ planId });

            if (!user || !plan) {
                return res.status(404).json({
                    success: false,
                    message: 'User or plan not found',
                });
            }

            if (planId === 'free') {
                
                const startDate = new Date();
                const endDate = new Date();
                endDate.setDate(endDate.getDate() + 14); 

                const subscription = new Subscription({
                    userId,
                    planId,
                    startDate,
                    endDate,
                    isYearly,
                });

                await subscription.save();

                await User.findByIdAndUpdate(userId, {
                    isSubscriber: true,
                    subscriptionStatus: 'active',
                    membershipType: planId,
                    subscriptionDate: startDate,
                    nextPaymentDue: endDate,
                });

                return res.status(201).json({
                    success: true,
                    data: subscription,
                    message: 'Free trial subscription activated.',
                });
            } else {
                
                const amount = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

                const options = {
                    amount: amount * 100, 
                    currency: 'INR',
                    receipt: `receipt_${Date.now()}`,
                };

                const order = await razorpay.orders.create(options);

                if (!order) {
                    return res.status(500).json({ success: false, message: "Failed to create Razorpay order" });
                }

                const payment = new SubscriptionPayment({
                    userId,
                    amount,
                    status: 'pending',
                    transactionId: order.id,
                    razorpayOrderId: order.id,
                    planId: planId,
                });

                const savedPayment = await payment.save();

                if (!savedPayment) {
                    return res.status(500).json({ success: false, message: "Failed to save payment" });
                }
                
                return res.status(201).json({
                    success: true,
                    data: savedPayment,
                    orderId: order.id,
                    amount: amount,
                    message: 'Payment order created successfully',
                });
            }

        } catch (error) {
            console.error("Error in payForSubscribe:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    },
    
    verifyPayment: async (req, res) => {
        try {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

            const body = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSignature = crypto
                .createHmac('sha256', 'W50i31GU4hsAObmu6DaTpw1f')
                .update(body.toString())
                .digest('hex');

            if (expectedSignature === razorpay_signature) {
                
                const payment = await SubscriptionPayment.findOneAndUpdate(
                    { razorpayOrderId: razorpay_order_id },
                    { status: 'success' },
                    { new: true }
                );

                const { userId } = payment;
                const user = await User.findById(userId);
                const plan = await Plan.findOne({ planId: user.membershipType });

                if (!user || !plan) {
                    return res.status(404).json({
                        success: false,
                        message: 'User or plan not found',
                    });
                }

                const startDate = new Date();
                const endDate = new Date();
                endDate.setMonth(endDate.getMonth() + (user.isYearly ? 12 : 1));  months

                
                const subscription = new Subscription({
                    userId,
                    planId: user.membershipType,
                    startDate,
                    endDate,
                    isYearly: user.isYearly,
                });

                await subscription.save();

                
                await User.findByIdAndUpdate(userId, {
                    isSubscriber: true,
                    subscriptionStatus: 'active',
                    subscriptionDate: startDate,
                    nextPaymentDue: endDate,
                });

                
                return res.status(200).json({
                    success: true,
                    message: 'Payment verified and subscription activated',
                    data: subscription,
                });
            } else {
                return res.status(400).json({ success: false, message: 'Invalid signature' });
            }
        } catch (error) {
            console.error("Payment verification error:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getPaymentsByUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const payments = await SubscriptionPayment.find({ userId }).populate('planId');
            res.status(200).json({ success: true, data: payments });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    subscribe: async (req, res) => {
        try {
            const { userId, planId, isYearly } = req.body;

            const user = await User.findById(userId);
            const plan = await Plan.findOne({ planId });

            if (!user || !plan) {
                return res.status(404).json({
                    success: false,
                    message: 'User or plan not found',
                });
            }

            const startDate = new Date();
            const endDate = new Date();
            if (planId === 'free') {
                endDate.setDate(endDate.getDate() + 14);
            } else {
                endDate.setMonth(endDate.getMonth() + (isYearly ? 12 : 1));
            }

            const subscription = new Subscription({
                userId,
                planId,
                startDate,
                endDate,
                isYearly,
            });

            await subscription.save();

            await User.findByIdAndUpdate(userId, {
                isSubscriber: true,
                subscriptionStatus: 'active',
                membershipType: planId,
                subscriptionDate: startDate,
                nextPaymentDue: endDate,
            });

            res.status(201).json({
                success: true,
                data: subscription,
                message: 'Successfully subscribed to plan',
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    cancelSubscription: async (req, res) => {
        try {
            const { userId, reason } = req.body;

            const subscription = await Subscription.findOne({
                userId,
                status: 'active',
            });

            if (!subscription) {
                return res.status(404).json({
                    success: false,
                    message: 'No active subscription found',
                });
            }

            subscription.status = 'cancelled';
            subscription.cancellationReason = reason;
            subscription.cancellationDate = new Date();
            subscription.autoRenew = false;

            await subscription.save();

            await User.findByIdAndUpdate(userId, {
                subscriptionStatus: 'inactive',
                membershipType: 'basic',
            });

            res.status(200).json({
                success: true,
                message: 'Subscription cancelled successfully',
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getUserSubscription: async (req, res) => {
        try {
            const { userId } = req.params;

            const subscription = await Subscription.findOne({
                userId,
                status: 'active',
            }).populate('userId');

            if (!subscription) {
                return res.status(404).json({
                    success: false,
                    message: 'No active subscription found',
                });
            }

            res.status(200).json({ success: true, data: subscription });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    updateUsageStats: async (req, res) => {
        try {
            const { userId, statType } = req.body;

            const subscription = await Subscription.findOne({
                userId,
                status: 'active',
            });

            if (!subscription) {
                return res.status(404).json({
                    success: false,
                    message: 'No active subscription found',
                });
            }

            switch (statType) {
                case 'recordedClass':
                    subscription.usageStats.recordedClassesAccessed += 1;
                    break;
                case 'liveClass':
                    subscription.usageStats.liveClassesAttended += 1;
                    break;
                case 'instructorSession':
                    subscription.usageStats.instructorSessionsUsed += 1;
                    break;
            }

            await subscription.save();

            res.status(200).json({
                success: true,
                message: 'Usage stats updated successfully',
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

