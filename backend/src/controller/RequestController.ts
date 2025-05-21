// backend/src/controller/RequestController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Request as AccessRequest } from '../entity/Request'; // Renamed to avoid conflict with Express Request
import { User } from '../entity/User';
import { Software } from '../entity/Software';

interface AuthRequest extends Request {
    user?: { id: number; role: string; username: string };
}

export class RequestController {
    static async submitRequest(req: AuthRequest, res: Response) {
        const { softwareId, accessType, reason } = req.body;
        const userId = req.user?.id; // Get user ID from authenticated token

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        try {
            const userRepository = AppDataSource.getRepository(User);
            const softwareRepository = AppDataSource.getRepository(Software);
            const requestRepository = AppDataSource.getRepository(AccessRequest);

            const user = await userRepository.findOneBy({ id: userId });
            const software = await softwareRepository.findOneBy({ id: softwareId });

            if (!user || !software) {
                return res.status(404).json({ message: 'User or Software not found' });
            }

            const newRequest = requestRepository.create({
                user: user,
                software: software,
                accessType,
                reason,
                status: 'Pending' // Default status for new requests
            });
            await requestRepository.save(newRequest);
            res.status(201).json({ message: 'Access request submitted successfully', request: newRequest });
        } catch (error) {
            console.error("Submit request error:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getPendingRequests(req: Request, res: Response) {
        try {
            const requestRepository = AppDataSource.getRepository(AccessRequest);
            const pendingRequests = await requestRepository.find({
                where: { status: 'Pending' },
                relations: ['user', 'software'] // Load related user and software data
            });
            res.status(200).json(pendingRequests);
        } catch (error) {
            console.error("Get pending requests error:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async approveRejectRequest(req: Request, res: Response) {
        const requestId = parseInt(req.params.id);
        const { status } = req.body; // 'Approved' or 'Rejected'

        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status provided' });
        }

        try {
            const requestRepository = AppDataSource.getRepository(AccessRequest);
            const request = await requestRepository.findOneBy({ id: requestId });

            if (!request) {
                return res.status(404).json({ message: 'Request not found' });
            }

            request.status = status; // Update request status
            await requestRepository.save(request);
            res.status(200).json({ message: Request ${status.toLowerCase()} successfully, request });
        } catch (error) {
            console.error("Approve/Reject request error:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}