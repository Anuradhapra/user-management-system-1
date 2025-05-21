// backend/src/entity/Request.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Software } from "./Software";

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User; // Many-to-one relationship with User entity

    @ManyToOne(() => Software)
    software!: Software; // Many-to-one relationship with Software entity

    @Column()
    accessType!: 'Read' | 'Write' | 'Admin'; // Type of access requested

    @Column('text')
    reason!: string; // Reason for the request

    @Column()
    status!: 'Pending' | 'Approved' | 'Rejected'; // Status of the request
}
    
    
   