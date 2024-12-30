import mongoose from "mongoose";

const Schema = mongoose.Schema;

const instructorSchema = new Schema({
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
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    certifications: [{
        type: String,
        trim: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

instructorSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Instructor = mongoose.model('Instructor', instructorSchema);

export default Instructor;