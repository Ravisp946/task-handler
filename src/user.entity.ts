/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'text', name: 'name'})
    name: string;

    @Column({ type: 'text', name: 'email'})
    email: string;

    @Column({ type: 'text', name: 'team'})
    team: string;

    @Column({ type: 'text', name: 'department'})
    department: string;

    @Column({ type: 'bigint', name: 'manager_id'})
    managerId: string;
}