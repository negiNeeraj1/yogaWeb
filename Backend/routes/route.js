import express from 'express';
import { login, logout, register } from '../controllers/user.controller.js';
import { getAdminDashboardAnalytics, loginAdmin, registerAdmin } from '../controllers/Admin.controller.js';

const router = express.Router();


// user routes
router.post('/user/register' , register);
router.post('/user/login' , login);
router.post('/user/logout' , logout)

// admin routes
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);
router.get('/admin/dashboard-analytics', getAdminDashboardAnalytics)

export default router;
