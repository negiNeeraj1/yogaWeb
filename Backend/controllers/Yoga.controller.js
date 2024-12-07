import { YogaClass, ClassAttendance, Subscription } from '../models/yogaModels';
import User from '../models/User';

class YogaClassController {
    // Create a new yoga class
    async createClass(classData) {
        try {
            const newClass = new YogaClass(classData);
            return await newClass.save();
        } catch (error) {
            throw new Error(`Error creating class: ${error.message}`);
        }
    }

    // Get all classes with optional filters
    async getAllClasses(filters = {}) {
        try {
            return await YogaClass.find(filters)
                .populate('instructor', 'firstName lastName');
        } catch (error) {
            throw new Error(`Error fetching classes: ${error.message}`);
        }
    }

    // Book a class for a user
    async bookClass(userId, classId) {
        try {
            const yogaClass = await YogaClass.findById(classId);
            if (!yogaClass) throw new Error('Class not found');

            const attendance = new ClassAttendance({
                yogaClass: classId,
                user: userId,
                status: 'registered'
            });

            return await attendance.save();
        } catch (error) {
            throw new Error(`Error booking class: ${error.message}`);
        }
    }
}

class AttendanceController {
    // Track user attendance in a class
    async markAttendance(classId, userId, attendanceData) {
        try {
            return await ClassAttendance.findOneAndUpdate(
                { yogaClass: classId, user: userId },
                {
                    ...attendanceData,
                    status: 'attended',
                    checkinTime: new Date()
                },
                { new: true, upsert: true }
            );
        } catch (error) {
            throw new Error(`Error marking attendance: ${error.message}`);
        }
    }

    // Get attendance statistics for a class
    async getClassAttendanceStats(classId) {
        try {
            return await ClassAttendance.aggregate([
                { $match: { yogaClass: classId } },
                {
                    $group: {
                        _id: '$yogaClass',
                        totalRegistered: { $sum: 1 },
                        attended: {
                            $sum: {
                                $cond: [{ $eq: ['$status', 'attended'] }, 1, 0]
                            }
                        }
                    }
                }
            ]);
        } catch (error) {
            throw new Error(`Error fetching attendance stats: ${error.message}`);
        }
    }
}

class SubscriptionController {
    // Create a new subscription for a user
    async createSubscription(userId, subscriptionData) {
        try {
            const subscription = new Subscription({
                user: userId,
                ...subscriptionData
            });
            return await subscription.save();
        } catch (error) {
            throw new Error(`Error creating subscription: ${error.message}`);
        }
    }

    // Get user's active subscriptions
    async getUserSubscriptions(userId) {
        try {
            return await Subscription.find({
                user: userId,
                status: 'active',
                endDate: { $gt: new Date() }
            });
        } catch (error) {
            throw new Error(`Error fetching subscriptions: ${error.message}`);
        }
    }

    // Validate and update subscription
    async validateSubscription(userId, classId) {
        try {
            const activeSubscription = await Subscription.findOne({
                user: userId,
                status: 'active',
                remainingClasses: { $gt: 0 }
            });

            if (!activeSubscription) {
                throw new Error('No active subscription found');
            }

            // Decrease remaining classes
            activeSubscription.remainingClasses -= 1;
            return await activeSubscription.save();
        } catch (error) {
            throw new Error(`Error validating subscription: ${error.message}`);
        }
    }
}

class DashboardController {
    constructor() {
        this.yogaClassController = new YogaClassController();
        this.attendanceController = new AttendanceController();
        this.subscriptionController = new SubscriptionController();
    }

    // Comprehensive dashboard metrics
    async getDashboardMetrics(userId) {
        try {
            const [
                totalClasses,
                activeClasses,
                completedClasses,
                upcomingClasses,
                totalSubscribers,
                averageAttendance
            ] = await Promise.all([
                YogaClass.countDocuments({}),
                YogaClass.countDocuments({
                    startTime: { $gt: new Date() },
                    status: 'scheduled'
                }),
                YogaClass.countDocuments({
                    endTime: { $lt: new Date() },
                    status: 'completed'
                }),
                YogaClass.countDocuments({
                    startTime: { $gt: new Date() }
                }),
                User.countDocuments({}),
                ClassAttendance.aggregate([
                    {
                        $group: {
                            _id: null,
                            avgAttendance: { $avg: '$attendancePercentage' }
                        }
                    }
                ])
            ]);

            return {
                totalClasses,
                activeClasses,
                completedClasses,
                upcomingClasses,
                totalSubscribers,
                averageAttendance: averageAttendance[0]?.avgAttendance || 0
            };
        } catch (error) {
            throw new Error(`Dashboard metrics error: ${error.message}`);
        }
    }
}

export {
    YogaClassController,
    AttendanceController,
    SubscriptionController,
    DashboardController
};