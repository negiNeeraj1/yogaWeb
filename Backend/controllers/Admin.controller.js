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
                    totalUsers: [{ $count: "count" }],
                    activeUsers: [
                        {
                            $match: {
                                lastLogin: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
                            },
                        },
                        { $count: "count" },
                    ],
                    newUsersToday: [
                        {
                            $match: {
                                joinedDate: {
                                    $gte: today,
                                    $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
                                },
                            },
                        },
                        { $count: "count" },
                    ],
                    registrationTrends: [
                        { $match: { joinedDate: { $gte: thirtyDaysAgo } } },
                        {
                            $group: {
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$joinedDate" } },
                                registrations: { $sum: 1 },
                            },
                        },
                        { $sort: { _id: 1 } },
                    ],
                },
            },
        ]);

        const analytics = userAnalytics[0];

        res.json({
            totalUsers: analytics.totalUsers[0]?.count || 0,
            activeUsers: analytics.activeUsers[0]?.count || 0,
            newUsersToday: analytics.newUsersToday[0]?.count || 0,
            registrationTrends: analytics.registrationTrends,
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving analytics", error: error.message });
    }
};
