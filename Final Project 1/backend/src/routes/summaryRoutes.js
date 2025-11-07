import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getSummaries, deleteSummary, getSummaryStats } from '../controllers/summaryController.js';

const router = express.Router();

// ✅ Get all summaries for logged-in user
router.get('/', protect, getSummaries);

// ✅ Get overall summary statistics for dashboard
router.get('/stats', protect, getSummaryStats);

// ✅ Delete a specific summary by ID
router.delete('/:id', protect, deleteSummary);

export default router;
