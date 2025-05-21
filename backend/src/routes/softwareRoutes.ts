// backend/src/routes/softwareRoutes.ts
import { Router } from 'express';
import { SoftwareController } from '../controller/SoftwareController';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

// Route for adding new software - Admin only
router.post('/', authenticateJWT, authorizeRoles(['Admin']), SoftwareController.createSoftware);
// Route to get list of all software (can be accessible by all authenticated users)
router.get('/', authenticateJWT, SoftwareController.getSoftwareList);

export default router;