import mongoose from 'mongoose';

// Yoga Class Model
const yogaClassSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    style: {
        type: String,
        enum: ['Hatha', 'Vinyasa', 'Ashtanga', 'Yin', 'Restorative', 'Power Yoga'],
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    maxParticipants: {
        type: Number,
        default: 20
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        enum: ['early-morning', 'morning', 'afternoon', 'evening', 'night']
    },
    classType: {
        type: String,
        enum: ['online', 'in-person', 'hybrid']
    },
    location: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
        default: 'scheduled'
    }
}, { timestamps: true });

// Class Attendance Model
const classAttendanceSchema = new mongoose.Schema({
    yogaClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'YogaClass',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attendancePercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    checkinTime: {
        type: Date
    },
    checkoutTime: {
        type: Date
    },
    status: {
        type: String,
        enum: ['registered', 'attended', 'cancelled', 'no-show'],
        default: 'registered'
    }
}, { timestamps: true });

// Subscription Model
const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['monthly', 'yearly', 'drop-in'],
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
    },
    totalClasses: {
        type: Number,
        default: 0
    },
    remainingClasses: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Export Models
const YogaClass = mongoose.model('YogaClass', yogaClassSchema);
const ClassAttendance = mongoose.model('ClassAttendance', classAttendanceSchema);
const Subscription = mongoose.model('Subscription', subscriptionSchema);

export {
    YogaClass,
    ClassAttendance,
    Subscription
};