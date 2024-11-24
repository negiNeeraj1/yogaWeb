import User from "../models/user.Model.js";

export const register = async(req, res , next) => {
    try {
        const { username, name, password, email } =  req.body;

        const existingUser = await User.findOne({$or : [{email} , {username}] })
        if(existingUser){
            return res.status(400).json({
                message : "User already exists"
            })
        }

        const user = new User({username, password, email , name});
        await user.save();

        req.session.userId = user._id;

        res.status(200).json({
            user:{
                id : user._id,
                username : user.username,
                email : user.email,
                role : user.role
            },
            message : "User registered successfully"
        })


    } catch (error) {
        res.status(500).json({ error: error.message || "something went wrong while registering user" });

    }
}

export const login = async(req, res) => {
    try {
        const {email , password , username} = req.body;
        
        const existingUser = await User.findOne({ $or: [{ email }, { username }] })
        if(!existingUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isMatch = await existingUser.comparePassword(password);
        if(!isMatch) {
            return res.status(401).json({
                message : "invalid credentials"
            })
        }

        await existingUser.save();
        req.session.userId = existingUser._id;

        res.json({
            user : {
                id : existingUser._id,
                username : existingUser.username,
                email : existingUser.email,
            },
            message : "User logged in successfully"
        })


    } catch (error) {
        res.status(500).json({
            error : error.message
        })
    }
}

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
        res.json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching profile",
            error: error.message
        });
    }
};

export const updateProfiie = (res , req , next) => {
    
}