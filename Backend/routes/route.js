import express from 'express';
import upload from '../config/multerCloudinary.js';
import { getUserAnalytics, login, logout, register, trackUserSession } from '../controllers/user.controller.js';
import { getAdminDashboardAnalytics, loginAdmin, registerAdmin } from '../controllers/Admin.controller.js';
import { createClass, deleteClass, getAllClasses, getClassById, updateClass, uploadVideo } from '../controllers/Yoga.controller.js';
import { getClassAttendanceStats, getUserEnrolledClasses, markAttendance, registerForClass } from '../controllers/attandance.controller.js';
import { createSubscription, getUserSubscriptions, updateSubscription } from '../controllers/subscription.controller.js';
import { createInstructor, deleteInstructor, getAllInstructors, getInstructorById, updateInstructor } from '../controllers/instructor.controller.js';
import { createPayment, getPaymentsByUser, verifyPayment } from '../controllers/payment.controller.js';

const router = express.Router();

// user routes
router.post('/user/register', register);
router.post('/user/login', login);
router.post('/user/logout', logout);
router.get('/user/analytics', getUserAnalytics);
router.post('/user/track-session', trackUserSession);

// admin routes
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);
router.get('/admin/dashboard-analytics', getAdminDashboardAnalytics);

// class routes
router.post('/classes/create', createClass);
router.get('/classes/get', getAllClasses);
router.get('/classes/get/:id', getClassById);
router.put('/classes/update/:id', updateClass);
router.delete('/classes/delete/:id', deleteClass);
router.post('/classes/upload-video/:classId',
    upload.single('video'),
    (error, req, res, next) => {
        if (error instanceof multer.MulterError) {
            return res.status(400).json({
                success: false,
                message: `Upload error: ${error.message}`
            });
        }
        next(error);
    },
    uploadVideo
);


// Attendance routes
router.post('/attendance/register', registerForClass);
router.post('/attendance/mark', markAttendance);
router.post('/attendance/stats', getClassAttendanceStats);
router.get('/classes/getenrolledclasses/:userId', getUserEnrolledClasses);

// Subscription routes
router.post('/subscriptions/create', createSubscription);
router.get('/subscriptions/:userId', getUserSubscriptions);
router.put('/subscriptions/update/:subscriptionId', updateSubscription);

// Instructor routes
router.post('/instructors/create', createInstructor);
router.get('/instructors/get', getAllInstructors);
router.get('/instructors/get/:id', getInstructorById);
router.put('/instructors/update/:id', updateInstructor);
router.delete('/instructors/delete/:id', deleteInstructor);

// Payment routes
router.post('/payments/create', createPayment);
router.get('/payments/:userId', getPaymentsByUser);
router.post('/payments/verify', verifyPayment);

export default router;
