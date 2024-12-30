import mongoose from 'mongoose';

// Yoga Class Model
const yogaClassSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    style: {
        type: String,
        enum: ['Hatha', 'Vinyasa', 'Ashtanga', 'Yin', 'Restorative', 'Power Yoga'],
        required: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    },
    duration: {
        type: Number,
        required: true,
        min: 15,
        max: 240
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    maxParticipants: {
        type: Number,
        default: 20,
        min: 1
    },
    currentParticipants: {
        type: Number,
        default: 0,
        min: 0,
        validate: {
            validator: function () {
                return this.currentParticipants <= this.maxParticipants;
            },
            message: "Current participants cannot exceed the maximum allowed participants."
        }
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        validate: {
            validator: function () {
                return this.endTime > this.startTime;
            },
            message: "End time must be after the start time."
        }
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
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
        default: 'scheduled'
    },
    videoUrls: { type: [String], default: [] },
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
    progress: {
        type: Number,
        default: 0
    },
    achievements: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['registered', 'attended', 'cancelled', 'no-show'],
        default: 'registered'
    },
    instructors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor'
    }],
    feedback: {
        type: String,
        trim: true,
        maxlength: 500
    },
    totalSessions: {
        type: Number,
        default: 10
    },
    completedSessions: {
        type: Number,
        default: 0
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
        required: true,
        validate: {
            validator: function () {
                return this.endDate > this.startDate;
            },
            message: "End date must be after the start date."
        }
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
    },
    totalClasses: {
        type: Number,
        default: 0,
        min: 0
    },
    remainingClasses: {
        type: Number,
        default: 0,
        min: 0,
        validate: {
            validator: function () {
                return this.remainingClasses <= this.totalClasses;
            },
            message: "Remaining classes cannot exceed total classes."
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    renewal: {
        type: Boolean,
        default: false
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