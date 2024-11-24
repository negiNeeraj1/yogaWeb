import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    username : {
        type : "String",
        required : true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    name: {
        type : "String",
        required : true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    email : {
        type : "String",
        required : true,
        trim: true,
        lowercase: true,
    },
    password : {
        type : "String",
        required : true,
        minlength: 6
    },
    role : {
        type : "String",
        enum : ["user" , "admin" , "instructor"],
        default : "user"
    },
    joinedDate : {
        type : "Date",
        default : Date.now
    }
},{
    timestamps : true
})

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

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);
export default User;