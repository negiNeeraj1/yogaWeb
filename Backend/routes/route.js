import express from 'express';
import upload from '../config/multerCloudinary.js';
import {
    getProfile,
    getUserAnalytics,
    login,
    logout,
    register,
    trackUserSession
} from '../controllers/user.controller.js';
import {
    getAdminDashboardAnalytics,
    loginAdmin,
    getAdminProfile,
    registerAdmin
} from '../controllers/Admin.controller.js';
import {
    createClass,
    deleteClass,
    getAllClasses,
    getClassById,
    updateClass,
    getClassAttendance,
    updateClassAttendance,
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
    uploadClassVideo
} from '../controllers/Yoga.controller.js';
import {
    getClassAttendanceStats,
    getUserEnrolledClasses,
    markAttendance,
    registerForClass
} from '../controllers/attandance.controller.js';
import {
    createAssistant,
    createInstructor,
    deleteInstructor,
    getAllInstructors,
    getInstructorById,
    updateInstructor
} from '../controllers/Instructor.controller.js';
import {
    createPayment,
    getPaymentsByUser,
    verifyPayment
} from '../controllers/payment.controller.js';

import { subscriptionController } from '../controllers/Subscription.controller.js';
import { getContactForm, submitForm } from '../controllers/contact.modal.js';
import uploadImage from '../config/multerCloudinary.js';

const router = express.Router();

// user routes
router.post('/user/register', register);
router.post('/user/login', login);
router.post('/user/logout', logout);
router.get('/user/profile/:id', getProfile);
router.get('/user/analytics', getUserAnalytics);
router.post('/user/track-session', trackUserSession);

// admin routes
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);
router.get('/admin/profile/:id', getAdminProfile);
router.get('/admin/dashboard-analytics', getAdminDashboardAnalytics);

// Yoga Class Routes
router.post('/classes/create', uploadImage.single('image'), createClass);
router.get('/classes/get', getAllClasses);
router.get('/classes/get/:id', getClassById);
router.put('/classes/update/:id', uploadImage.single('image'), updateClass);
router.delete('/classes/:id', deleteClass);
router.post('/classes/:classId/videos', upload.single('video'), uploadClassVideo);

// Class Attendance Routes
router.get('/classes/:classId/attendance', getClassAttendance);
router.put('/attendance/:id', updateClassAttendance);

// Attendance routes
router.post('/attendance/register', registerForClass);
router.post('/attendance/mark', markAttendance);
router.post('/attendance/stats', getClassAttendanceStats);
router.get('/classes/getenrolledclasses/:userId', getUserEnrolledClasses);

// Subscription Routes
router.post('/subscriptions/create', createSubscription);
router.get('/subscriptions/get', getAllSubscriptions);
router.get('/subscriptions/get/:id', getSubscriptionById);
router.put('/subscriptions/update/:id', updateSubscription);
router.delete('/subscriptions/delete/:id', deleteSubscription);

// Instructor routes
router.post('/instructors/create',createInstructor);
router.get('/instructors/get', getAllInstructors);
router.get('/instructors/get/:id', getInstructorById);
// router.put('/instructors/update/:id', upload.fields([
//     { name: 'main_photo', maxCount: 1 },
//     { name: 'cover_photo', maxCount: 1 }
// ]),
//     updateInstructor, updateInstructor);
router.delete('/instructors/delete/:id', deleteInstructor);
router.post('/instructors/create', createInstructor);

// assistant
router.post('/assistant/create', createAssistant);
router.get('/assistant/get', getAllInstructors);
router.get('/instructors/get/:id', getInstructorById);
router.put('/instructors/update/:id', updateInstructor);
router.delete('/instructors/delete/:id', deleteInstructor);

// Room Routes
router.post('/rooms/create', createRoom);
router.get('/rooms/get', getAllRooms);
router.get('/rooms/get/:id', getRoomById);
router.put('/rooms/update/:id', updateRoom);
router.delete('/rooms/delete/:id', deleteRoom);

// Payment routes
router.post('/payments/create', createPayment);
router.get('/payments/:userId', getPaymentsByUser);
router.post('/payments/verify', verifyPayment);

// subscription routes
router.post('/plans/create', subscriptionController.createPlan);
router.put('/plans/update/:planId', subscriptionController.updatePlan);
router.delete('/plans/delete/:planId', subscriptionController.deletePlan);
router.get('/plans/get', subscriptionController.getPlans);
router.get('/user/subscription/:userId', subscriptionController.getUserSubscription);

// Payment Routes 
router.post('/subscriptions/pay', subscriptionController.payForSubscribe); 
router.post('/subscriptions/verify-payment', subscriptionController.verifyPayment);
router.get('/subscriptions/payments/:userId', subscriptionController.getPaymentsByUser);

// User Subscription Route (Fetch User Subscription Details)
router.get('/user/subscription/:userId', subscriptionController.getUserSubscription);

// contact
router.post('/contact/send', submitForm)
router.post('/contact/get', getContactForm);
export default router;
