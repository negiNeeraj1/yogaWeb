import cloudinary from '../config/cloudinary.js';
import { YogaClass, ClassAttendance, Subscription, Room } from '../models/Yoga.model.js';

export const createClass = async (req, res) => {
    try {
        const newClass = new YogaClass(req.body);
        const savedClass = await newClass.save();
        res.status(201).json({ success: true, data: savedClass });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllClasses = async (req, res) => {
    try {
        const filters = req.query || {};
        const classes = await YogaClass.find(filters)
            .populate('instructor', 'name email')
            .populate('room', 'name location');
        res.status(200).json({ success: true, data: classes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getClassById = async (req, res) => {
    try {
        const { id } = req.params;
        const yogaClass = await YogaClass.findById(id)
            .populate('instructor', 'name email')
            .populate('assistant', 'name email')
            .populate('room', 'name location');
        if (!yogaClass) {
            return res
                .status(404)
                .json({ success: false, message: 'Class not found' });
        }
        res.status(200).json({ success: true, data: yogaClass });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedClass = await YogaClass.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedClass) {
            return res
                .status(404)
                .json({ success: false, message: 'Class not found' });
        }
        res.status(200).json({ success: true, data: updatedClass });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClass = await YogaClass.findByIdAndDelete(id);
        if (!deletedClass) {
            return res
                .status(404)
                .json({ success: false, message: 'Class not found' });
        }
        res.status(200).json({ success: true, message: 'Class deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const uploadClassVideo = async (req, res) => {
    try {
        const { classId } = req.params;
        const {
            title,
            description,
            classNumber
        } = req.body;

        const file = req.file; 

        console.log('Request files:', req.file);
        console.log('Request body:', req.body);

        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'No video file uploaded'
            });
        }

        if (!title || !description || !classNumber) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: title, description, or classNumber'
            });
        }

        const yogaClass = await YogaClass.findById(classId);
        if (!yogaClass) {
            return res.status(404).json({
                success: false,
                message: 'Class not found'
            });
        }

        const existingVideo = yogaClass.videos.find(v => v.classNumber === classNumber);
        if (existingVideo) {
            const publicId = existingVideo.url.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
        }   

        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'video',
            folder: `yoga-classes/${classId}`,
            public_id: `class-${classNumber}-${Date.now()}`,
            transformation: [
                { quality: 'auto' },
                { fetch_format: 'auto' },
                { width: 1280 },
                { crop: 'limit' }
            ]
        });

        const videoData = {
            title,
            description,
            url: result.secure_url,
            classNumber,
            uploadedAt: new Date()
        };

        if (existingVideo) {
            const videoIndex = yogaClass.videos.findIndex(v => v.classNumber === classNumber);
            yogaClass.videos[videoIndex] = videoData;
        } else {
            yogaClass.videos.push(videoData);
        }

        if (yogaClass.remainingClasses > 0) {
            yogaClass.remainingClasses = Math.max(0, yogaClass.remainingClasses - 1);
        }

        await yogaClass.save();

        res.status(200).json({
            success: true,
            message: 'Video uploaded successfully',
            data: {
                classId: yogaClass._id,
                video: videoData,
                remainingClasses: yogaClass.remainingClasses
            }
        });

    } catch (error) {
        console.error('Error uploading video:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error uploading video',
            error: error.message
        });
    }
};

export const getClassAttendance = async (req, res) => {
    try {
        const { classId } = req.params;
        const attendance = await ClassAttendance.find({ yogaClass: classId })
            .populate('user', 'name email');
        res.status(200).json({ success: true, data: attendance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateClassAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAttendance = await ClassAttendance.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAttendance) {
            return res
                .status(404)
                .json({ success: false, message: 'Attendance record not found' });
        }
        res.status(200).json({ success: true, data: updatedAttendance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// subscription

export const createSubscription = async (req, res) => {
    try {
        const newSubscription = new Subscription(req.body);
        const savedSubscription = await newSubscription.save();
        res.status(201).json({ success: true, data: savedSubscription });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSubscriptionById = async (req, res) => {
    try {
        const { id } = req.params;
        const subscription = await Subscription.findById(id);
        if (!subscription) {
            return res
                .status(404)
                .json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSubscription = await Subscription.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSubscription) {
            return res
                .status(404)
                .json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, data: updatedSubscription });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSubscription = await Subscription.findByIdAndDelete(id);
        if (!deletedSubscription) {
            return res
                .status(404)
                .json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, message: 'Subscription deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// room


export const createRoom = async (req, res) => {
    try {
        const newRoom = new Room(req.body);
        const savedRoom = await newRoom.save();
        res.status(201).json({ success: true, data: savedRoom });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json({ success: true, data: rooms });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findById(id);
        if (!room) {
            return res
                .status(404)
                .json({ success: false, message: 'Room not found' });
        }
        res.status(200).json({ success: true, data: room });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRoom = await Room.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRoom) {
            return res
                .status(404)
                .json({ success: false, message: 'Room not found' });
        }
        res.status(200).json({ success: true, data: updatedRoom });
    } catch (error) {
        res.status (500).json({ success: false, message: error.message });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRoom = await Room.findByIdAndDelete(id);
        if (!deletedRoom) {
            return res
                .status(404)
                .json({ success: false, message: 'Room not found' });
        }
        res.status(200).json({ success: true, message: 'Room deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};