import Admin from "../models/Admin.login.model.js";
import User from "../models/user.Model.js"; 

export const registerAdmin = async (req, res, next) => {
    try {
        const { Fname, Lname, email, password, phone_Number, userPhoto } = req.body;

        
        if (!Fname || !Lname || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        
        const existingUser = await Admin.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }

        
        const user = new Admin({
            Fname,
            Lname,
            email: email.toLowerCase(),
            password,
            phone_Number,
            userPhoto: userPhoto || '' 
        });

        
        await user.save();

        
        if (req.session) {
            req.session.userId = user._id;
        }

        
        res.status(201).json({
            user: {
                id: user._id,
                firstName: user.Fname,
                lastName: user.Lname,
                email: user.email,
                role: user.role
            },
            message: "User registered successfully"
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            error: error.message || "Something went wrong while registering user"
        });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;


        const existingUser = await Admin.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        const isMatch = await existingUser.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }


        existingUser.lastLogin = new Date();
        await existingUser.save();


        req.session.userId = existingUser._id;


        res.json({
            user: {
                id: existingUser._id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                role: existingUser.role
            },
            message: "User logged in successfully"
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: error.message || "Internal server error"
        });
    }
}

export const getAdminDashboardAnalytics = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);

        const userAnalytics = await User.aggregate([
            {
                $facet: {
                    // Total Users Count
                    totalUsers: [{ $count: 'count' }],

                    // Active Users (last 7 days)
                    activeUsers: [
                        {
                            $match: {
                                lastLogin: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
                            }
                        },
                        { $count: 'count' }
                    ],

                    // New Users Today
                    newUsersToday: [
                        {
                            $match: {
                                createdAt: {
                                    $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                                    $lt: new Date(new Date().setHours(23, 59, 59, 999))
                                }
                            }
                        },
                        { $count: 'count' }
                    ],

                    // Logins Today
                    loginsToday: [
                        {
                            $match: {
                                lastLogin: {
                                    $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                                    $lt: new Date(new Date().setHours(23, 59, 59, 999))
                                }
                            }
                        },
                        { $count: 'count' }
                    ],

                    // Registration Trends (Last 30 Days)
                    registrationTrends: [
                        {
                            $match: {
                                createdAt: { $gte: thirtyDaysAgo }
                            }
                        },
                        {
                            $group: {
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                                registrations: { $sum: 1 }
                            }
                        },
                        { $sort: { _id: 1 } }
                    ],

                    // Activity Distribution
                    activityDistribution: [
                        {
                            $group: {
                                _id: '$experienceLevel',
                                value: { $sum: 1 }
                            }
                        }
                    ],

                    // Login Activity Distribution
                    loginActivity: [
                        {
                            $addFields: {
                                loginHour: { $hour: { $ifNull: ['$lastLogin', '$createdAt'] } }
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    $switch: {
                                        branches: [
                                            { case: { $lt: ['$loginHour', 6] }, then: 'Early Morning' },
                                            { case: { $lt: ['$loginHour', 12] }, then: 'Morning' },
                                            { case: { $lt: ['$loginHour', 17] }, then: 'Afternoon' },
                                            { case: { $lt: ['$loginHour', 21] }, then: 'Evening' }
                                        ],
                                        default: 'Night'
                                    }
                                },
                                logins: { $sum: 1 }
                            }
                        }
                    ],

                    // Subscribers
                    subscribers: [
                        {
                            $match: {
                                isSubscriber: true,
                                subscriptionStatus: 'active'
                            }
                        },
                        { $count: 'count' }
                    ],

                    // Average Session Duration
                    averageSessionDuration: [
                        { $unwind: '$sessionDurations' },
                        {
                            $group: {
                                _id: null,
                                avgDuration: { $avg: '$sessionDurations.duration' }
                            }
                        }
                    ]
                }
            }
        ]);

        const analytics = userAnalytics[0];

        res.json({
            // Basic Metrics
            totalUsers: analytics.totalUsers[0]?.count || 0,
            activeUsers: analytics.activeUsers[0]?.count || 0,
            newUsersToday: analytics.newUsersToday[0]?.count || 0,
            loginsToday: analytics.loginsToday[0]?.count || 0,
            uniqueVisitors: analytics.activeUsers[0]?.count || 0,
            subscribers: analytics.subscribers[0]?.count || 0,
            averageSessionDuration: `${Math.round(analytics.averageSessionDuration[0]?.avgDuration || 0)} mins`,

            // Trends and Distributions for Charts
            registrationTrends: analytics.registrationTrends.map(trend => ({
                name: trend._id,
                registrations: trend.registrations
            })),

            activityDistribution: analytics.activityDistribution.map(activity => ({
                name: activity._id,
                value: activity.value
            })),

            loginActivity: analytics.loginActivity.map(login => ({
                name: login._id,
                logins: login.logins
            }))
        });

    } catch (error) {
        console.error('Analytics retrieval error:', error);
        res.status(500).json({
            message: 'Error retrieving dashboard analytics',
            error: error.message
        });
    }
};