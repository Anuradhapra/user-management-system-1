// backend/src/controller/AuthController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class AuthController {
    static async signup(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash password securely
            const userRepository = AppDataSource.getRepository(User);
            // Default role for new users is 'Employee'
            const newUser = userRepository.create({ username, password: hashedPassword, role: 'Employee' });
            await userRepository.save(newUser);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error("Signup error:", error);
            if (error.code === '23505') { // PostgreSQL unique violation error code
                return res.status(409).json({ message: 'Username already exists' });
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async login(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ username });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token with user ID, username, and role
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET || 'your_jwt_secret_key_change_this',
                { expiresIn: '1h' } // Token expires in 1 hour
            );
            res.status(200).json({ token, role: user.role }); // Return token and user role
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}