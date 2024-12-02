import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    // Basic Information
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'prefer-not-say']
    },
    phone: {
        type: String,
        trim: true
    },

    // Health Information
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    medicalConditions: [{
        type: String,
        enum: [
            'None',
            'Back Pain',
            'Arthritis',
            'High Blood Pressure',
            'Diabetes',
            'Heart Condition',
            'Pregnancy',
            'Other'
        ]
    }],
    medications: {
        type: String,
        trim: true
    },
    injuries: {
        type: String,
        trim: true
    },

    // Yoga Experience
    experienceLevel: {
        type: String,
        enum: ['beginner', 'novice', 'intermediate', 'advanced']
    },
    preferredStyle: {
        type: String,
        enum: ['Hatha', 'Vinyasa', 'Ashtanga', 'Yin', 'Restorative', 'Power Yoga', 'Not Sure']
    },
    flexibility: {
        type: String,
        enum: ['limited', 'moderate', 'good', 'excellent']
    },
    strengthLevel: {
        type: String
    },

    // Goals and Preferences
    fitnessGoals: [{
        type: String,
        enum: [
            'Flexibility',
            'Strength',
            'Weight Loss',
            'Stress Relief',
            'Better Sleep',
            'Pain Management',
            'Spiritual Growth'
        ]
    }],
    focusAreas: [{
        type: String,
        enum: [
            'Back',
            'Core',
            'Upper Body',
            'Lower Body',
            'Balance',
            'Breathing',
            'Meditation'
        ]
    }],
    preferredTime: {
        type: String,
        enum: [
            'early-morning',
            'morning',
            'afternoon',
            'evening',
            'night'
        ]
    },
    sessionDuration: {
        type: Number,
        enum: [15, 30, 45, 60, 90]
    },

    // Lifestyle
    occupation: {
        type: String,
        enum: [
            'desk-job',
            'physical-labor',
            'service-industry',
            'healthcare',
            'education',
            'remote-work',
            'student',
            'retired',
            'other'
        ]
    },
    stressLevel: {
        type: String,
        enum: ['low', 'moderate', 'high', 'very high']
    },
    sleepQuality: {
        type: String,
        enum: ['excellent', 'good', 'fair', 'poor', 'insomnia']
    },
    dietaryPreferences: {
        type: String,
        enum: [
            'vegetarian',
            'vegan',
            'gluten-free',
            'dairy-free',
            'pescatarian',
            'no restrictions',
            'other'
        ]
    },
    activityLevel: {
        type: String,
        enum: [
            'sedentary',
            'light',
            'moderate',
            'active',
            'very-active'
        ]
    },

    // Additional User Management Fields
    role: {
        type: String,
        enum: ['user', 'admin', 'instructor'],
        default: 'user'
    },
    joinedDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Password comparison method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;