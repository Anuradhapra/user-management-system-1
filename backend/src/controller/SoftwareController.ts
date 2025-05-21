// backend/src/controller/SoftwareController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Software } from '../entity/Software';

export class SoftwareController {
    static async createSoftware(req: Request, res: Response) {
        const { name, description, accessLevels } = req.body;
        try {
            const softwareRepository = AppDataSource.getRepository(Software);
            const newSoftware = softwareRepository.create({ name, description, accessLevels });
            await softwareRepository.save(newSoftware);
            res.status(201).json({ message: 'Software created successfully', software: newSoftware });
        } catch (error) {
            console.error("Create software error:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getSoftwareList(req: Request, res: Response) {
        try {
            const softwareRepository = AppDataSource.getRepository(Software);
            const softwareList = await softwareRepository.find();
            res.status(200).json(softwareList);
        } catch (error) {
            console.error("Get software list error:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}