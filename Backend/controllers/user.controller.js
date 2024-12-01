import User from "../models/user.Model.js";

export const register = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            dateOfBirth,
            gender,
        
            height,
            weight,
            medicalConditions,
            injuries,
        
            experienceLevel,
            preferredStyle,
            flexibility,
        
            fitnessGoals,
            focusAreas,
            preferredTime,
            sessionDuration,
        
            occupation,
            stressLevel,
            sleepQuality,
            dietaryPreferences,
            activityLevel
        } = req.body;

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }

        
        const user = new User({
        
            firstName,
            lastName,
            email,
            password,
            dateOfBirth,
            gender,
            
            height,
            weight,
            medicalConditions,
            injuries,
            
            experienceLevel,
            preferredStyle,
            flexibility,

            fitnessGoals,
            focusAreas,
            preferredTime,
            sessionDuration,
            
            occupation,
            stressLevel,
            sleepQuality,
            dietaryPreferences,
            activityLevel
        });
        
        await user.save();

        req.session.userId = user._id;

        
        res.status(201).json({
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const existingUser = await User.findOne({ email });
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
};

export const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error logging out' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'User logged out successfully' });
    });
};

export const getProfile = async (req, res) => {
    try {
        
        const user = await User.findById(req.user._id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching profile",
            error: error.message
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const updateData = req.body;

        
        const protectedFields = ['_id', 'email', 'password', 'role', 'joinedDate'];
        protectedFields.forEach(field => {
            delete updateData[field];
        });

        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            {
                new: true,  
                runValidators: true  
            }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user: updatedUser,
            message: "Profile updated successfully"
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({
            success: false,
            message: "Error updating profile",
            error: error.message
        });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        
        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({
            success: false,
            message: "Error changing password",
            error: error.message
        });
    }
};