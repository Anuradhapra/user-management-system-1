// backend/src/routes/requestRoutes.ts
import { Router } from 'express';
import { RequestController } from '../controller/RequestController';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

// Route for submitting an access request - Employee only
router.post('/', authenticateJWT, authorizeRoles(['Employee']), RequestController.submitRequest);

// Route for managers to view pending requests
router.get('/pending', authenticateJWT, authorizeRoles(['Manager']), RequestController.getPendingRequests);

// Route for managers to approve or reject requests - Manager only
router.patch('/:id', authenticateJWT, authorizeRoles(['Manager']), RequestController.approveRejectRequest);

export default router;