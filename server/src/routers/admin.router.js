import express from 'express';
import * as adminController from '../controllers/admin.controller.js';
import adminAuth from '../middlewares/admin.auth.js';

const router = express.Router();

router.post('/admins/new', adminController.createAdmin);

router.post('/admins/login', adminController.login);

router.post('/admins/logout', adminAuth, adminController.logout);

export default router;