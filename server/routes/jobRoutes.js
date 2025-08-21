// server/routes/jobRoutes.js
import express from 'express';
import { applyToJob /*, other functions... */ } from '../controllers/jobController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Ensure correct path and extension

const express = require('express');
const router = express.Router();
const {
  // ... your other imported functions
  applyToJob // 👈 Import the new function
} = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

// ... (your existing GET and POST routes)

// 👇 Add this new route definition
router.post('/:id/apply', authMiddleware, applyToJob);

module.exports = router;