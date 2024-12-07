import express from 'express';
import { getUserAnalytics, login, logout, register, trackUserSession } from '../controllers/user.controller.js';
import { getAdminDashboardAnalytics, loginAdmin, registerAdmin } from '../controllers/Admin.controller.js';

const router = express.Router();


// user routes
router.post('/user/register' , register);
router.post('/user/login' , login);
router.post('/user/logout' , logout)
router.get('user/analytics',
    // requireAuth,
    // requireAdminRole,
    getUserAnalytics
);
router.post('user/track-session',
    // requireAuth,
    trackUserSession
);

// admin routes
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);
router.get('/admin/dashboard-analytics', getAdminDashboardAnalytics)

export default router;
